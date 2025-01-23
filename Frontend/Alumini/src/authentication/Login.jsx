// Login.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Hifavicon from "../assets/hiicon.png";
import "./Login.css";
import { Box, Typography } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import Gimg from "../assets/Gimg.png";
import RightContainer from "../assets/rightContainer.jpg";
import SignUp from "./SignUp";
import OtpPage from "./OtpPage";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [openOTP, setOpenOTP] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false);

  
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (tokenResponse?.credential) {
        const decoded = jwtDecode(tokenResponse.credential);
        console.log("Google User Email:", decoded.email);
      } else {
        console.error("Google login failed: No credential response.");
      }
    },
    onError: () => {
      console.error("Google login failed.");
    },
  });
  

  const {user} = useContext(UserContext)

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://alumini-tracking-system.onrender.com/log", {email: values.email})
      .then((res) => {
        if (res.data.valid) {
          if (!res.data.otp_verified) {
            // If OTP is not verified, navigate to the OTP page
            navigate("/otp");
          } else {
            // If OTP is verified, set the user and navigate to the home page
            setUser({
              email: res.data.email,
              role: res.data.role,
              id: res.data.id,
              otp_verified: true
            });
            navigate("/home");
          }
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, setUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Hi1")
    axios
      .post("https://alumini-tracking-system.onrender.com/log/login", values)
      .then((res) => {
        if (res.data.Status === "OTP sent") {
          setUser({ otp_verified: false });
          setUser({email})
          setOpenOTP(true)
          console.log("Hi1")
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit1 = (email) => {
    event.preventDefault();
    setValues({ ...values, email: email})
    console.log("Hi1")
    axios
      .post("https://alumini-tracking-system.onrender.com/log/login", {email})
      .then((res) => {
        if (res.data.Status === "OTP sent") {
          setUser({ otp_verified: false });
          setOpenOTP(true)
          console.log("Hi1")
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const redirectToSignUp = () => {
    setOpenSignUp(true);
    // navigate("/signUp");
  }

 

  return (
    <>
    {!openSignUp ? !openOTP ? (
    <div className="login">
      <div className="login-container-left">
        <div className="welcome">
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 700,
              fontFamily: "Poppins",
              padding: "30px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              marginTop: "20px"
            }}
          >
            WELCOME BACK!!
            <img
              src={Hifavicon}
              style={{
                width: "38px",
                height: "47px",
                marginLeft: "1px",
                transform: "rotate(10deg)",
                backgroundColor: " #ffffff",
              }}
            />
          </Typography>
        </div>
        <div className="login-form">
          <div className="login-header">
          <h2>LOGIN</h2>
          <h2>ALUMNI TRACKING SYSTEM</h2>
          <p className="para1">
              BANNARI AMMAN INSTITUTE OF TECHNOLOGY
            </p>
           
            
            <p className="para">
              Together, we grow stronger—log in and connect.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <div className="input-wrapper">
                  <MdOutlineMailOutline
                    style={{
                      fontSize: "20px",
                      marginTop: "14px",
                      fontWeight: 200,
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="input-container">
                <div className="input-wrapper">
                  <CiLock style={{ fontSize: "20px", marginTop: "14px" }} />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                  />
                </div>
              </div>

            

              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  backgroundColor: " #ffffff",
                }}
              >
                <a
                  href="#"
                  style={{
                    fontSize: "10px",
                    color: "#050505",
                    textDecoration: "none",
                    backgroundColor: " #ffffff",
                    marginRight: "40px",
                    marginBottom: "10px",
                  }}
                >
                  Forgot password?
                </a>
              </div> */}
              <button  className="login-but" type="submit">
             
                Login Now
              </button>
            </form>
            


              <div className="loginWithOther">
                <p style={{fontSize:"15px"}}><span style={{fontWeight:"700"}}>Login</span> &nbsp; with Others</p>
              </div>
              <Box sx={{ml:16, mb:3}}>
              <GoogleLogin
 onSuccess={credentialResponse => {
  const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
  handleSubmit1(credentialResponseDecoded.email)
}}
  onError={() => {
    console.log('Login Failed');
  }}
/></Box>
             
              <button type='button' onClick={redirectToSignUp} className="login-with-google">
                 <Link style={{ textDecoration: "none", color: "#1B4BDA" }}>&nbsp; Sign Up &nbsp; </Link> as an Alumni
              </button>
          </div>
        </div>
      </div>
      <div className="login-container-right">
        <img
          src={RightContainer}
        //   style={{
        //     height: "99vh",
        //     width: "53em",
        //   }}
        />
      </div>
    </div>
  ): <OtpPage email={values.email} password={values.password} /> :(
    <SignUp 
    openSignUp={setOpenSignUp}
    />
  )} 
  </>
  );
}

export default Login;
