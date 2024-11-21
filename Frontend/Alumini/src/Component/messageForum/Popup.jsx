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
  height: "55%",
};

function Popup({ open, handleClose }) {
  const [title, setTitle] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const postData = {
      title: title,
      content: thoughts,
      image: image ? image : null,
    };

    console.log(postData);

    try {
      const response = await axios.post(
        "http://localhost:8081/create/threads",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Post created successfully!");
        setTitle("");
        setThoughts("");
        setImage(null);
        handleClose(); // Close the modal
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("An error occurred while creating the post.");
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
              Post
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "17px",
                color: "#767676",
                mt: "4px",
              }}
            >
              Create your post here...
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
                      Title:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <input
                        id="outlined-basic"
                        placeholder="Title of the post"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                          border: "#42506666 1.6px solid",
                          borderRadius: "8px",
                          width: "600px",
                          height: "40px",
                          textAlign: "left",
                          lineHeight: "40px",
                          paddingLeft: "12px",
                        }}
                      />
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
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Image:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <input
                        id="outlined-basic"
                        placeholder="Import image here"
                        variant="outlined"
                        style={{
                          border: "#42506666 1.6px solid",
                          borderRadius: "8px",
                          width: "600px",
                          height: "40px",
                          lineHeight: "40px",
                          paddingLeft: "12px",
                        }}
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
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
                      sx={{ fontWeight: 400, fontSize: "18px", border: "none" }}
                    >
                      Thoughts:{" "}
                    </TableCell>
                    <TableCell align="right" sx={{ border: "none" }}>
                      <input
                        id="outlined-basic"
                        placeholder="Share your thoughts here.."
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
                        value={thoughts}
                        onChange={(e) => setThoughts(e.target.value)}
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
