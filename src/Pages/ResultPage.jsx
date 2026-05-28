import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { output_image, ai_suggestion, confidence, risk_percentage } = location.state || {};

    if (!output_image) return <p className="no-result">No result found!</p>;

    const safeRisk = isNaN(risk_percentage) ? 0 : risk_percentage;

    const getRiskColor = (risk) => {
        return risk <= 5 ? "green" : "red";
    };

    return (
        <div className="result-page">
            <h2>Detection Result</h2>


            <div className="result-image-wrapper">
                <img
                    src={`http://127.0.0.1:8000/${output_image}`}
                    alt="Result"
                    className="result-image"
                />
            </div>


            <div className="result-info-wrapper">
                {/* <div className="info-box confidence-box" style={{ color: getRiskColor(safeRisk), fontSize: "24px", fontWeight: "bold" }}>
                    <strong> Fire Risk:</strong> {safeRisk.toFixed(2) + "%"}
                </div> */}

                <div className="info-box suggestion-box">
                    <strong>AI Suggestion:</strong>{" "}
                    {ai_suggestion.split(" ").map((word, idx) => {
                        let className = "";
                        const lower = word.toLowerCase();
                        if (lower.includes("fire")) className = "keyword-fire";
                        else if (lower.includes("smoke")) className = "keyword-smoke";
                        else if (lower.includes("dry")) className = "keyword-dry";
                        else if (lower.includes("patchy")) className = "keyword-patchy";

                        return className ? (
                            <span key={idx} className={className}> {word} </span>
                        ) : (
                            <span key={idx}> {word} </span>
                        );
                    })}
                </div>
            </div>

            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default ResultPage;



