import React, { useState } from 'react';
import './style.css';
import MentorMenteeForm from './feedbackform';


function LoginPage() {  // Capitalized 'P' in LoginPage
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const handleLoginClick = () => {
        setShowFeedbackForm(true); // Show feedback form on login click
    };
    return (
        <div>
            {!showFeedbackForm ? (  // Conditional rendering
            <div className="box">  {/* 'class' changed to 'className' */}
           
            <div className="login">
            
                <div className="loginBx">
                    <h2>
                        <i className="fa-solid fa-right-to-bracket"></i>Login<i className="fa-solid fa-arrow-down-up-lock" style={{ color: '#63E6BE' }}></i> {/* Inline styles use double curly braces */}
                    </h2>
                    <input type="text" placeholder="Username" />  {/* Self-closing tag */}
                    <input type="password" placeholder="Password" />  {/* Self-closing tag */}
                    <input type="submit" value="Sign in" onClick={handleLoginClick} />  {/* Self-closing tag */}
                    <div className="group">  {/* 'class' changed to 'className' */}
                        <a href="javascript:void(0);">Forgot Password</a>
                        <a href="feedbackform.js">Sign up</a>
                    </div>
                </div>
                
            </div>
            
        </div>
    ) : (
        <MentorMenteeForm /> // Render feedback form if login button is clicked
    )}
        </div>
        

    )
}

export default LoginPage;  // Corrected the export statement

