import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  border: "1px solid none",
  boxShadow: 24,
  borderRadius: "6px",
  height: "75%",
};

function JobInfo({ open, handleClose, data }) {

  console.log(data)

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
             Job Offer Info
            </Typography>
          </Box>
          <Box sx={{ p: 3, display: "flex", alignItems:"center", justifyContent: "center" }}>
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
                    
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 600, fontSize: "18px", border: "none" }}
                    >
                      Job Role:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                     <Typography sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}>{data.job_title}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={2}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                    
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 600, fontSize: "18px", border: "none" }}
                    >
                      Company Name:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}>{data.company_name}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={3}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                     
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "18px", border: "none" }}
                    >
                      Minimum Salary:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}>{data.expected_minimum_salary_per_year}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={4}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                      
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "18px", border: "none" }}
                    >
                      Maximum Salary:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}>{data.expected_maximum_salary_per_year}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={5}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                    
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "18px", border: "none" }}
                    >
                      Location:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}>{data.location}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={6}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                    
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "18px", border: "none" }}
                    >
                      Offer URL:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ fontWeight: 400, fontSize: "18px", border: "none", cursor:"pointer" }}>{data.offer_url? data.offer_url: "No Link"}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    key={7}
                    sx={{
                      borderBottom: "none",
                      display: "flex",
                    
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: 600, fontSize: "18px", border: "none" }}
                    >
                      Posted By:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                    <Typography sx={{ fontWeight: 400, fontSize: "18px", border: "none", cursor:"pointer" }}>{data.name}{" "}({data.job_title})</Typography>
                    </TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default JobInfo;
