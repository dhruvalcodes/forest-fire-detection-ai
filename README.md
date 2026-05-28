# 🔥 FireGuard – AI Forest Fire Detection System

FireGuard is an AI-powered full-stack application that detects forest fire, smoke, dry vegetation, and patchy areas from images using deep learning models and provides real-time safety suggestions.

## 🚀 Overview

This system combines:
- CNN-based image classification
- YOLO object detection
- FastAPI backend
- React frontend

It analyzes uploaded forest images and returns:
- Detection results (Fire / Smoke / Normal / Patchy)
- Bounding boxes for detected objects
- AI-generated risk suggestions
- Confidence scores


## 🧠 AI Models Used

### 1. CNN Model (MobileNetV2)
- Classifies image into:
  - Fire
  - Smoke
  - Patchy
  - Normal
- Provides confidence score

### 2. YOLO Model (Ultralytics)
- Detects objects:
  - fire
  - smoke
  - dry
  - patchy
- Draws bounding boxes on image


## 🛠️ Tech Stack

### Backend:
- FastAPI
- TensorFlow / Keras
- YOLO (Ultralytics)
- OpenCV
- Pillow
- NumPy

### Frontend:
- React (Vite)
- JavaScript
- React Router
- Lucide Icons
- CSS

## 📁 Project Structure
Backend/
├── app/
├── models/
├── fonts/
├── predictions/
├── requirements.txt
├── main.py

Frontend/
├── src/
├── public/
├── index.html
├── package.json


## ⚙️ How to Run

### 🔹 Backend
cd backend
pip install -r requirements.txt
uvicorn main:app –reload

### 🔹 Frontend
cd frontend
npm install
npm run dev


## 📡 API Endpoint

### POST /detect

Upload an image → returns:
- CNN prediction
- Confidence score
- YOLO bounding boxes
- AI safety suggestion
- Output image with annotations


## 🧾 Example Output Logic

- Fire + Smoke + Dry → High risk alert
- Fire detected → Fire warning
- Smoke detected → Low/medium risk
- Dry area → Potential risk warning


## 🎯 Key Features

- Real-time image analysis
- Dual AI model system (CNN + YOLO)
- Annotated output images
- Risk-based AI suggestions
- Full-stack web application


## 📊 Highlights

- Combines classification + object detection
- FastAPI backend for high performance
- Interactive React UI
- Production-style ML pipeline


## 👨‍💻 Author

Dhruval Prajapati  
GitHub: https://github.com/dhruvalcodes
LinkedIn: http://www.linkedin.com/in/dhruval-prajapati-1732aa316


## 📌 Note

This project was developed as part of a final year university project and is continuously being improved for real-world deployment.
