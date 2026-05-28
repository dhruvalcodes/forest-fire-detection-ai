import React from "react";
import { useNavigate } from "react-router-dom";

const NavButtons = ({ type }) => {
    const navigate = useNavigate();

    // Header buttons scroll to sections on the same page
    const headerButtons = [

    ];

    // Footer buttons navigate to separate pages
    const footerButtons = [
        { label: "Privacy", action: () => navigate("/privacy") },
        { label: "Terms", action: () => navigate("/terms") },
        { label: "Support", action: () => navigate("/support") }
    ];

    const buttons = type === "header" ? headerButtons : footerButtons;

    return (
        <>
            {buttons.map((btn, idx) => (
                <button key={idx} onClick={btn.action}>
                    {btn.label}
                </button>
            ))}
        </>
    );
};

export default NavButtons;