import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import "./UploadPage.css";

const message = "AI is analysing the image 🔥";

const UploadPage = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const progressIntervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
    };

    const handleDetect = async () => {
        if (!image) {
            setShowPopup(true);
            return;
        }
        setLoading(true);
        setProgress(0);

        progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 2.5));
        }, 100);

        try {
            const formData = new FormData();
            formData.append("file", image);

            const response = await fetch("http://127.0.0.1:8000/detect", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Backend response:", data);

            timeoutRef.current = setTimeout(() => {
                clearInterval(progressIntervalRef.current);
                setLoading(false);

                navigate("/result", {
                    state: {
                        image,
                        cnn_prediction: data.cnn_prediction,
                        confidence: data.confidence,
                        yolo_boxes: data.yolo_boxes,
                        ai_suggestion: data.ai_suggestion,
                        output_image: data.output_image,
                        risk_percentage: data.risk_percentage,  // <-- add this line
                    },
                });
            }, 4000);
        } catch (err) {
            console.error("Error uploading image:", err);
            clearInterval(progressIntervalRef.current);
            alert("Error connecting to backend");
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setLoading(false);
        setProgress(0);
        clearInterval(progressIntervalRef.current);
        clearTimeout(timeoutRef.current);
    };

    return (
        <div className="upload-page">


            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Please select an image first!</p>
                        <button onClick={() => setShowPopup(false)}>OK</button>
                    </div>
                </div>
            )}


            <div className="upload-box">
                {!loading ? (
                    <>
                        <h2>Upload Your Image</h2>


                        <div className="fixed-upload-area">
                            {!image ? (
                                <label className="choose-file">
                                    Choose File
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            ) : (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected"
                                    className="preview-image"
                                />
                            )}
                        </div>


                        {image && (
                            <button className="change-btn" onClick={() => setImage(null)}>
                                Change Image
                            </button>
                        )}


                        <button className="upload-btn" onClick={handleDetect}>
                            <Upload size={20} style={{ marginRight: "8px" }} /> Detect Fire
                        </button>


                        <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                    </>
                ) : (

                    <div className="loading-center">
                        <p className="loading-message">
                            <span className="orange-text">AI is analysing</span> your image
                            <span className="dot-anim">
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </span>
                        </p>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPage;


