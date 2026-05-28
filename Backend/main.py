import cv2
import numpy as np
from tensorflow.keras.models import load_model
from ultralytics import YOLO
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import os
from PIL import Image, ImageDraw, ImageFont
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import cv2
import numpy as np


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/predictions", StaticFiles(directory="predictions"),
          name="predictions")


# def fire_area_ratio(image_path):
#     """Calculate fraction of image covered by fire-like colors"""
#     img = cv2.imread(image_path)
#     hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

#     # Fire color threshold (tweak if needed)
#     lower = np.array([0, 50, 200])
#     upper = np.array([35, 255, 255])
#     mask = cv2.inRange(hsv, lower, upper)

#     fire_pixels = np.sum(mask > 0)
#     total_pixels = img.shape[0] * img.shape[1]

#     return fire_pixels / total_pixels  # 0 to 1


# def fire_risk_percentage(cnn_confidence, fire_area_ratio):
#     """Combine CNN confidence with fire area to get realistic risk"""
#     risk = cnn_confidence * fire_area_ratio * 100
#     return round(risk, 2)


@app.get("/")
async def root():
    return {"message": "Backend is running"}


cnn_model = load_model("app/models/my_model.keras")
yolo_model = YOLO("app/models/best_model.pt")
os.makedirs("predictions", exist_ok=True)
class_names = ["Fire", "Normal", "Patchy", "Smoke"]


@app.post("/detect")
async def detect(file: UploadFile = File(...)):

    img_path = f"predictions/{file.filename}"
    with open(img_path, "wb") as f:
        f.write(await file.read())

    img = Image.open(img_path)

    yolo_boxes = []

    img_cnn = img.resize((224, 224)).convert("RGB")
    img_array = np.array(img_cnn) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    cnn_preds = cnn_model.predict(img_array)
    cnn_confidence = float(np.max(cnn_preds))

    if np.isnan(cnn_confidence):
        cnn_confidence = 0.0
    cnn_class = class_names[np.argmax(cnn_preds)]
    CNN_THRESHOLD = 0.50
    if cnn_confidence < CNN_THRESHOLD:
        cnn_class = "No significant detectionnn"

    yolo_results = yolo_model.predict(img_path, conf=0.04)
    yolo_boxes = []

    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype(
            "app/fonts/Roboto-VariableFont_wdth,wght.ttf", size=20)
    except:
        font = ImageFont.load_default()

    yolo_colors = {
        "fire": "red",
        "smoke": "orange",
        "patchy": "blue",
        "dry": "green"
    }

    for r in yolo_results:
        for box, cls, conf in zip(r.boxes.xyxy, r.boxes.cls, r.boxes.conf):
            if conf < 0.04:
                continue
            x1, y1, x2, y2 = box.tolist()
            label = r.names[int(cls)].lower()
            color = yolo_colors.get(label, "white")
            draw.rectangle([x1, y1, x2, y2], outline=color, width=3)
            draw.text((x1, y1 - 20), label, fill=color, font=font)
            yolo_boxes.append([x1, y1, x2, y2, float(conf), label])

    suggestion = "No significant risk detected."
    yolo_labels = [b[5] for b in yolo_boxes]

    if "fire" in yolo_labels and "smoke" in yolo_labels and "dry" in yolo_labels:
        suggestion = "High fire risk detected! Immediate attention required."
    elif "fire" in yolo_labels or cnn_class.lower() == "fire":
        suggestion = "Fire detected. Take necessary precautions."
    elif "dry" in yolo_labels:
        suggestion = "Dry area detected. High chance of fire spreading. Monitor closely."
    elif "patchy" in yolo_labels:
        suggestion = "Patchy area detected. Conditions not critical but monitor for changes."
    elif "smoke" in yolo_labels:
        suggestion = "Low fire risk due to smoke presence."

    output_path = f"predictions/output_{file.filename}"
    img.save(output_path)

    return JSONResponse({
        "output_image": output_path,
        "cnn_prediction": cnn_class,
        "confidence": cnn_confidence,
        # "risk_percentage": risk_percentage,
        "yolo_boxes": yolo_boxes,
        "ai_suggestion": suggestion
    })

    # --------- Handle case when YOLO finds nothing ---------
    # if len(yolo_boxes) == 0:
    #     suggestion = "No significant harm detected."
    #     # risk_percentage = 0.0  # override
    #     # cnn_confidence = 0.0

    # CNN label (no box, just text)
    # draw.text((10, 10), f"CNN: {cnn_class}", fill="yellow")
    # # --------- Calculate realistic Fire Risk ---------
    # area_ratio = fire_area_ratio(img_path)
    # risk_percentage = fire_risk_percentage(cnn_confidence, area_ratio)
