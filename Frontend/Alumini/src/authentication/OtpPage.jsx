import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AlumniProfileForm from "./AlumniProfileCreation";
import "./OtpPage.css";

function OtpPage({ email, alumini = false, password }) {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // Initialize the countdown to 30 seconds
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // open alumini profile form
  console.log(email);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically focus on the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  //resent otp
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    if (!alumini) {
      axios
        .post("http://localhost:8081/log/login", { email, password }) // Ensure email is sent as an object
        .then((res) => {
          if (res.data.Status === "OTP sent") {
            console.log("hi");
            setTimeLeft(30); // Reset the timer

            setError("");
          } else {
            alert(res.data.Error);
          }
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:8081/log/get-otp", { email })
        .then((res) => {
          if (res.data.message === "User Exists Already") {
            setError("Email Already exists");
          } else if (res.data.Status === "OTP sent") {
            setOpen(true); //alumni profile page
            console.log("Hi1");
          } else {
            alert(res.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //reduce the timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer); // Cleanup timer on unmount or reset
    } else {
      setError("OTP expired. Please request a new one.");
    }
  }, [timeLeft]);

  //verifying the entered otp both register alumni and normal user
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    try {
      const response = await axios.post(
        alumini
          ? "http://localhost:8081/log/verify-alumini-otp"
          : "http://localhost:8081/log/verify-otp",
        { email, otp: otpString }
      );
      //if it is alumni
      if (alumini) {
        if (response.data.Status === "Success") {
          // Set the user role for alumni after successful OTP verification
          setUser({ email });
          //open the alumni profile form registration
          setOpen(true);
        } else {
          setError("Invalid OTP. Please try again.");
        }
        return;
      }
      //if normal user
      if (response.data.Status === "Success") {
        setUser({ email });
        setUser({ otp_verified: true });
        navigate("/home");
      } else {
        setUser({});
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
      <div className="body">
        {!open ? (
          <div className="otp-page">
            <h2>Verify OTP</h2>
            <p>Enter the verification code we just sent to your E-mail</p>
            {timeLeft > 0 ? (
              <p>Time remaining: {timeLeft}s</p>
            ) : (
              <p className="error-message">
                OTP expired. Please request a new one.
              </p>
            )}
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  disabled={timeLeft === 0}
                />
              ))}
            </div>
            <form onSubmit={handleOtpSubmit} className="otp">
              <button type="submit" disabled={timeLeft === 0}>
                Verify
              </button>
            </form>
            <p>
              Didn't receive code?
              <a
                className="resend-btn"
                onClick={handleSubmit}
                disabled={timeLeft > 0}
              >
                Resend
              </a>
            </p>
            {error && <p className="error-message">{error}</p>}
          </div>
        ) : (
          <AlumniProfileForm email={email} />
        )}
      </div>
    </>
  );
}

export default OtpPage;
