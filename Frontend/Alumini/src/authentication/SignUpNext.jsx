// SignUpNext.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUpNext.css";
import { Typography } from "@mui/material";
import RightContainer from "../assets/rightContainer.jpg";
import Login from "./Login";

function SignUpNext() {
  const [values, setValues] = useState({
    Name: "",
    rollno: "",
    email: "",
    batch: "",
    department: "",
    alumniCode: "",
  });
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User Details:", values);
    navigate("/login");
  };

  const redirectToLogin = () => {
    setOpenLogin(true);
  };

  return (
    <>
      {!openLogin ? (
        <div className="signupNext">
          <div className="signupNext-container-left">
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
                }}
              >
                WELCOME!!
              </Typography>
            </div>
            <div className="signupNext-form">
              <div className="signupNext-header">
                <h2>SIGN UP</h2>
                <p className="para">
                  Together, we grow stronger—log in and connect.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-container-signupNext">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="Name"
                        name="userName"
                        onChange={(e) =>
                          setValues({ ...values, userName: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="Roll Number"
                        name="rollno"
                        onChange={(e) =>
                          setValues({ ...values, rollno: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="email"
                        placeholder="Official EmailId"
                        name="email"
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="Year of Completion"
                        name="batch"
                        onChange={(e) =>
                          setValues({ ...values, batch: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="Department"
                        name="department"
                        onChange={(e) =>
                          setValues({ ...values, department: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        placeholder="Alumni Code"
                        name="alumniCode"
                        onChange={(e) =>
                          setValues({ ...values, alumniCode: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="login-button" onClick={redirectToLogin}>
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="signupNext-container-right">
            <img
              src={RightContainer}
              alt="Right Container"
              style={{
                height: "100vh",
                width: "46em",
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default SignUpNext;