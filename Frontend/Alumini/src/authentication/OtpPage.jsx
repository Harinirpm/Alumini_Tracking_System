import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function OtpPage({ email, alumini = false, password }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // Initialize the countdown to 30 seconds
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email)

    axios
      .post("http://localhost:8081/log/login", { email, password }) // Ensure email is sent as an object
      .then((res) => {
        if (res.data.Status === "OTP sent") {
          setTimeLeft(30); // Reset the timer
          setError("");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer); // Cleanup timer on unmount or reset
    } else {
      setError("OTP expired. Please request a new one.");
    }
  }, [timeLeft]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        alumini ? "http://localhost:8081/log/verify-alumini-otp" : "http://localhost:8081/log/verify-otp",
        { email, otp }
      );

      if (response.data.Status === "Success") {
        setUser({ otp_verified: true });
        navigate("/home"); // Redirect to home page
      } else {
        setUser({});
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while verifying OTP.");
    }
  };

  return (
    <div className="otp-page">
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to your email: <strong>{email}</strong></p>
      {timeLeft > 0 ? (
        <p>Time remaining: {timeLeft} seconds</p>
      ) : (
        <p className="error-message">OTP expired. Please request a new one.</p>
      )}
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
          required
          disabled={timeLeft === 0} // Disable input if OTP has expired
        />
        <button type="submit" disabled={timeLeft === 0}>
          Verify OTP
        </button>
      </form>
      <button onClick={handleSubmit} disabled={timeLeft > 0}>
        Resend OTP
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default OtpPage;
