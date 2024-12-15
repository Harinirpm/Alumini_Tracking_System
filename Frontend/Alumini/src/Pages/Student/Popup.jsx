import React, { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "1px solid none",
  boxShadow: 24,
  borderRadius: "6px",
  height: "87%",
};

function Popup({ open, handleClose }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [location, setLocation] = useState("")
  const [offerURL, setOfferURL] = useState(null)
  const {user} = useContext(UserContext)
  const roles = ["Senior UX Designer", "Software Engineer II", "Software Engineer I"]
  const companyList = ["Zoho", "Microsoft", "Amazon", "Facebook", "Spotify"]
  console.log(user)

  const handleSubmit = async () => {
    const postData = {
      job_title: title,
      company_name: company,
      expected_minimum_salary_per_year: parseFloat(start),
      expected_maximum_salary_per_year: parseFloat(end),
    //   content: thoughts,
      location : location,
      created_by: user?.id,
      offer_url: offerURL
    };

    console.log(postData);

    try {
      const response = await axios.post(
        "http://localhost:8081/create/joboffer",
        postData
      );

      if (response.status === 200) {
        alert("Job Offer created successfully!");
        setTitle("");
        setCompany("");
        setStart();
        setEnd()
        setLocation("")
        handleClose(); // Close the modal
      } else {
        alert("Failed to create job offer.");
      }
    } catch (error) {
      console.error("Error submitting job offer:", error);
      alert("An error occurred while creating the job offer.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ height: "11px", background: "#1B4BDA" }}></Box>
        <Box sx={{ p: 2 }}>
          <Box>
            <Typography
              sx={{ fontWeight: 600, fontSize: "24px", color: "#101010" }}
            >
              Create Job Offer
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "17px",
                color: "#767676",
                mt: "4px",
              }}
            >
              Create Job offer here...
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "none" }}
            >
              <Table
                sx={{ minWidth: 650, border: "none" }}
                aria-label="simple table"
              >
                <TableBody
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    pr: 2,
                  }}
                >
                  <TableRow
                    key={1}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Job Role:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Job Role</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={title}
                          label="Job Role"
                          sx={{
                            border: "#42506666 1.6px solid",
                            borderRadius: "8px",
                            width: "613px",
                            height: "40px",
                            textAlign: "left",
                            paddingLeft: "12px",    
                          }}
                          onChange={(e) => setTitle(e.target.value)}
                        >
                          {roles.map((item, index) => <MenuItem value={item}>{item}</MenuItem>)}
                        
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={2}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Company Name:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> Company Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={company}
                          label="Job Role"
                          sx={{
                            border: "#42506666 1.6px solid",
                            borderRadius: "8px",
                            width: "613px",
                            height: "40px",
                            textAlign: "left",
                            paddingLeft: "12px",    
                          }}
                          onChange={(e) => setCompany(e.target.value)}
                        >
                          {companyList.map((item, index) => <MenuItem value={item}>{item}</MenuItem>)}
                        
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={3}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Minimum Salary:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <input
                        id="outlined-basic"
                        placeholder="Starting Salary"
                        variant="outlined"
                        style={{
                          border: "#42506666 1.6px solid",
                          borderRadius: "8px",
                          width: "600px",
                          height: "40px",
                          lineHeight: "40px",
                          paddingLeft: "12px",
                        }}
                        value={start}
                        type="number"
                        onChange={(e) => setStart(e.target.files[0])}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={4}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Maximum Salary:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <input
                        id="outlined-basic"
                        placeholder="Maximum Salary Expected"
                        variant="outlined"
                        style={{
                          border: "#42506666 1.6px solid",
                          borderRadius: "8px",
                          width: "600px",
                          height: "40px",
                          textAlign: "left",
                          lineHeight: "40px",
                          paddingLeft: "12px",
                        }}
                        type="number"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={5}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Location:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <input
                        id="outlined-basic"
                        placeholder="Job Location"
                        variant="outlined"
                        style={{
                          border: "#42506666 1.6px solid",
                          borderRadius: "8px",
                          width: "600px",
                          height: "40px",
                          textAlign: "left",
                          lineHeight: "40px",
                          paddingLeft: "12px",
                        }}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={6}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Offer URL:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <input
                        id="outlined-basic"
                        placeholder="Offer URL"
                        variant="outlined"
                        style={{
                          border: "#42506666 1.6px solid",
                          borderRadius: "8px",
                          width: "600px",
                          height: "40px",
                          textAlign: "left",
                          lineHeight: "40px",
                          paddingLeft: "12px",
                        }}
                        value={offerURL}
                        onChange={(e) => setOfferURL(e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ width: "94%", display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "4px",
                textTransform: "none",
                backgroundColor: "#3B64DF",
                textAlign: "right",
                width: "120px",
              }}
              onClick={() => handleSubmit()}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default Popup;
