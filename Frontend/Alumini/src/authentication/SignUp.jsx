// SignUp.js
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./SignUp.css";
import { Typography } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import RightContainer from "../assets/rightContainer.jpg";
import { FaRegUser } from "react-icons/fa6";
import SignUpNext from "./SignUpNext";
import OtpPage from "./OtpPage";
import axios from "axios";

function SignUp({openSignUp}) {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [warning, setWarning] = useState(null)
   const [openOTP, setOpenOTP] = useState(false)
  const [selectedRole, setSelectedRole]=useState('');
  const [openSignUpNext, setOpenSignUpNext] =useState(false);
  //handling role here
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  }
  //navigate to the extra aditional details based on the role. it is a temproary function. 
  //i created here just for creating the page.
  const handleSignUpNextChange = () => {
    setOpenSignUpNext(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/log/get-otp", {email :values.email})
      .then((res) => {
        if(res.data.message === "User Exists Already" ){
          setWarning("Email Already exists" )
        }
        else if (res.data.Status === "OTP sent") {
          setOpenOTP(true)
          console.log("Hi1")
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const redirectToLogin = () => {
    openSignUp(false);
  };

  return (
    <>
    {!openSignUpNext ? !openOTP ? (
    <div className="signup">
      <div className="signup-container-left">
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
            WELCOME!!
          </Typography>
        </div>
        <div className="signup-form">
          <div className="signup-header">
            <h2>SIGN UP</h2>
            <p className="para">
            Together, we grow stronger — sign up and connect.
            </p>
            <form onSubmit={handleSubmit}>
            {/* <div className="input-container">
                <div className="input-wrapper">
                  <FaRegUser
                    style={{
                      fontSize: "16px",
                      marginTop: "14px",
                      fontWeight: 200,
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={(e) =>
                      setValues({ ...values, userName: e.target.value })
                    }
                    required
                  />
                </div>
              </div> */}
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
                    required
                  />
                </div>
                {warning && <Typography sx={{color:"red", fontSize:"18px",mt:2}}>{warning}</Typography>}
              </div>
              {/* <div className="input-container">
                <div className="input-wrapper">
                  <CiLock style={{ fontSize: "20px", marginTop: "14px" }} />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div> */}
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
                    fontSize: "12px",
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
              {/* <div className="dropdown-container">
               <div className="input-wrapper">
                  <FaRegUser
                    style={{
                      fontSize: "15px",
                      marginTop: "14px",
                      fontWeight: 200,
                    }}
                  />
            <select
                id="role-dropdown"
                className="dropdown-select"
                placeholder="Role"
                value={selectedRole}
                onChange={handleRoleChange}
            >
                <option value="" disabled>Role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="alumni">Alumni</option>
            </select>
             {selectedRole && <p className="selected-role">You selected: {selectedRole}</p>}
            </div>  
        </div> */}
              <button type="submit" className="login-button" onClick={handleSubmit}>
                Submit
              </button>
             
              <button
                type="button"
                onClick={redirectToLogin}
                className="signUp-with-google"
              >
                Already have an account? <Link to = '/'>&nbsp; Log In</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="signUp-container-right">
        <img
          src={RightContainer}
          alt="Right Container"
          
        />
      </div>
    </div>
    ) : <OtpPage email={values.email} alumini={true} /> :
    (
      <>
      <SignUpNext />
      </>

    )
    }
    </>
  );
}

export default SignUp;