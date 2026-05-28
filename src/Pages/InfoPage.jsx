import React from "react";
import { useNavigate } from "react-router-dom";
import NavButtons from "../components/NavButtons";
import "./InfoPage.css";

const InfoPage = () => {
    const navigate = useNavigate();

    return (
        <div className="info-page">
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Home Page
            </button>

            <header className="info-header">
                <div className="logo-gradient"></div>
                <nav>
                    <NavButtons type="header" />
                </nav>
            </header>


            <section id="about" className="info-section">
                <h2>About FireGuard</h2>
                <p>
                    FireGuard is an AI-powered solution to detect forest fires early using real-time image analysis.
                    <span className="highlight"> Protect communities and nature before it's too late.</span>
                </p>
            </section>

            <section id="contact" className="info-section">
                <h2>Contact Us</h2>
                <p>
                    Reach out to our team for support, partnerships, or general inquiries. <br />
                    Email: <span className="highlight">info@fireguard.ai</span> <br />
                    Phone: <span className="highlight">+44 123 456 7890</span>
                </p>
            </section>

            <section id="privacy" className="info-section">
                <h2>Privacy Policy</h2>
                <p>
                    We respect your privacy. Any data collected is used solely to improve fire detection and community safety.
                </p>
            </section>

            <section id="terms" className="info-section">
                <h2>Terms of Service</h2>
                <p>
                    By using FireGuard, you agree to our terms and conditions designed to ensure safe and responsible use.
                </p>
            </section>

            <section id="support" className="info-section">
                <h2>Support</h2>
                <p>
                    Our support team is here to assist you with any questions or technical issues. Contact us via email or phone.
                </p>
            </section>


        </div>
    );
};

export default InfoPage;