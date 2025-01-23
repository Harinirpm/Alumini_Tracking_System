import React, { useState } from "react";
import { Button, TextField, Typography, Stepper, Step, StepLabel, Box } from "@mui/material";
import { styled } from "@mui/system";
import axios from 'axios'

const FormContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
});

const steps = [
    "Personal Info",
    "Education Info",
    "Job Info",
    "Proof & Submit",
];

const AlumniProfileForm = ({ email }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formFilled, setFormFilled] = useState(false)
    const [formData, setFormData] = useState({
        email: email,
        fullName: "",
        dob: "",
        gender: "",
        phone: "",
        degree: "",
        department: "",
        graduationYear: "",
        rollNo: "",
        jobTitle: "",
        companyName: "",
        industry: "",
        experience: "",
        description: "",
        location: "",
        linkedin: "",
        proof: null,
        password: "",
        termsAccepted: false,
        profileImage: null
    });
    const [error, setError] = useState("");

    const handleNext = () => {
        if (validateStep(activeStep)) {
            setError(""); // Clear previous errors
            if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, proof: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (validateStep(activeStep)) {
          const data = new FormData();
          for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
              data.append(key, formData[key]);
            }
          }
      
          try {
            const response = await axios.post(
              "http://localhost:8081/alumini/createProfile",
              data,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
      
            if (response.status === 200) {
              console.log(response.data);
              setFormFilled(true)
            } else {
              alert("Failed to submit profile. Please try again.");
            }
          } catch (error) {
            console.error("Error submitting profile:", error);
            alert("An error occurred while submitting your profile.");
          }
        }
      };
      

    const validateStep = (step) => {
        const validations = {
            0: () =>
                formData.fullName &&
                formData.dob &&
                formData.gender &&
                formData.phone,
            1: () =>
                formData.degree &&
                formData.department &&
                formData.graduationYear &&
                formData.rollNo,
            2: () =>
                formData.jobTitle &&
                formData.companyName &&
                formData.industry &&
                formData.experience &&
                formData.description &&
                formData.location &&
                formData.linkedin,
            3: () => formData.proof && formData.password && formData.termsAccepted && formData.profileImage,
        };

        if (!validations[step]()) {
            setError("Please fill all the required fields before proceeding.");
            return false;
        }
        return true;
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <FormContainer>
                        <TextField
                            sx={{my:1}}
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </FormContainer>
                );
            case 1:
                return (
                    <FormContainer>
                        <TextField
                        sx={{my:1}}
                            label="Degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Graduation Year"
                            name="graduationYear"
                            type="number"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Roll Number"
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            required
                        />
                    </FormContainer>
                );
            case 2:
                return (
                    <FormContainer>
                        <TextField
                        sx={{mb:1}}
                            label="Job Title"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Domain of Work"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Years of Experience"
                            name="experience"
                            type="number"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{my:1}}
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                        sx={{mt:1}}
                            label="LinkedIn URL"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            required
                        />
                    </FormContainer>
                );
            case 3:
                return (
                    <FormContainer>
                        <Typography variant="h6">Upload Proof Document</Typography>
                        <input
                            type="file"
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, proof: e.target.files[0] }))
                            }
                            required
                            accept=".pdf,.jpg,.png"
                        />
                        <Box sx={{my:1}}></Box>
                        <Typography variant="h6">Upload Profile Image</Typography>
                        <input
                            type="file"
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }))
                            }
                            required
                            accept=".jpg,.jpeg,.png"
                        />
                           <Box sx={{my:1}}></Box>
                           <Typography variant="h6">Enter Your Password</Typography>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            sx={{mb:1}}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        termsAccepted: e.target.checked,
                                    }))
                                }
                                required
                               
                            />
                        {" "}  So far, the details filled in by me are true.
                        </label>
                    </FormContainer>
                );
            default:
                return null;
        }
    };

    return (
        <Box>
        {!formFilled ? 
        <Box sx={{ width: "80%", margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom sx={{fontSize:"27px", mt:4, mb:4}}>
                Alumni Profile Creation
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label} completed={index < activeStep}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{mb:4}}></Box>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={activeStep === steps.length-1 ? handleSubmit : handleNext}>
                {renderStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button
                        type={activeStep === steps.length-1 ? "submit" : "button"}
                        variant="contained"
                        color="primary"
                        onClick={activeStep < steps.length-1 ? handleNext : null}
                    >
                        {activeStep === steps.length-1 ? "Submit" : "Next"}
                    </Button>
                </Box>
            </form>
        </Box>  
        :
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Full viewport height
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          padding: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            mb: 2,
          }}
        >
          Your profile has been submitted.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#555',
          }}
        >
          After approval, you will receive an email.
        </Typography>
      </Box>
            }
            </Box>
    );
};

export default AlumniProfileForm;
