import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
// import "./OtpPage.css";

function OtpPage({ email }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();
  console.log(email)

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const response = await axios.post("http://localhost:8081/log/verify-otp", {
        email,
        otp,
      });

      if (response.data.Status === "Success") {
        setUser({ otp_verified: true });
        navigate("/home"); // Redirect to home page
      } else {
        setUser({})
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying OTP.");
    }
  };

  return (
    <div className="otp-page">
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to your email: {email}</p>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default OtpPage;
