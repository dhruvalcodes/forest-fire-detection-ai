import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { Upload, Cpu, Bell, ScanLine } from "lucide-react";
import NavButtons from "../components/NavButtons"; // adjust path if needed

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">

            <section className="landing">
                <header className="landing-header">
                    <div className="logo-gradient"></div>
                    <nav>
                        <NavButtons type="header" />
                    </nav>
                </header>

                <div className="landing-content hero-section">
                    <div className="hero-heading-wrapper">
                        <h1>
                            <span className="white-text">Protect Our Forests</span> <br />
                            <span className="orange-text">Before It's Too Late</span>
                        </h1>
                    </div>

                    <h3 className="hero-tagline">
                        <strong>FireGuard</strong>
                        <span style={{ color: 'white' }}> - Smart Vision, Dedicated to Forest Safety</span>
                    </h3>

                    <p className="hero-paragraph">
                        FireGuard helps you <span className="orange-text">stay ahead</span> of forest fires by analyzing images in real-time.
                        <span className="orange-text">Protect your community</span> and the environment, get <span className="orange-text">instant alerts</span>,
                        and take action before damage spreads. Easy to use, reliable, and designed to make a <span className="orange-text">real difference</span>.
                    </p>

                    <div className="scan-button-wrapper">
                        <button className="scan-button" onClick={() => navigate("/upload")}>
                            <span className="text">Scan Now</span>
                            <ScanLine size={18} className="scan-icon" />
                        </button>


                        <button
                            className="text-hover-btn"
                            onClick={() => {
                                const el = document.querySelector('.how-it-works');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            How It Works
                        </button>
                    </div>
                </div>
            </section>


            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="boxes-container">
                    <div className="work-box" onClick={() => navigate("/upload")}>
                        <Upload size={42} className="box-icon" />
                        <h3>Step 1</h3>
                        <p>Upload an image of the forest area.</p>
                        <span className="box-hint">Click to upload</span>
                    </div>

                    <div className="work-box">
                        <Cpu size={42} className="box-icon" />
                        <h3>Step 2</h3>
                        <p>AI analyzes the image for fire and smoke.</p>
                        <span className="box-hint">Processing securely</span>
                    </div>

                    <div className="work-box">
                        <Bell size={42} className="box-icon" />
                        <h3>Step 3</h3>
                        <p>Get instant alerts if fire or smoke is detected.</p>
                        <span className="box-hint">Act before it spreads</span>
                    </div>
                </div>

                <div className="final-paragraph">
                    <p>
                        With <span className="orange-text">FireGuard</span>, monitoring forest areas is easier than ever.
                        Stay informed, <span className="orange-text">act quickly</span>, and protect what <span className="orange-text">matters most</span>.
                        Our <span className="orange-text">AI-driven app</span> empowers communities and individuals to make a <span className="orange-text">real difference</span> in preventing forest disasters.
                    </p>
                </div>


                <footer className="landing-footer">
                    <div>&copy; 2026 FireGuard</div>
                    <div>
                        <a href="/privacy">Privacy</a>
                        <a href="/terms">Terms</a>
                        <a href="/support">Support</a>
                    </div>

                </footer>
            </section>
        </div>
    );
};

export default Landing;
















