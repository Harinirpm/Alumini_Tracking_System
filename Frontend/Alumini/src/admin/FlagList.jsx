import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import axios from "axios";

const FlagList = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [comment, setComment] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const flagsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/flags")
      .then((response) => {
        setFlags(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching flags:", error);
        setLoading(false);
      });
  }, []);

  const handleDialogOpen = (flag) => {
    setSelectedFlag(flag);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedFlag(null);
    setComment("");
    setDialogOpen(false);
  };

  const handleCommentSubmit = () => {
    if (selectedFlag) {
      axios
        .put(`http://localhost:8081/admin/flags/review`, {
          id: selectedFlag.id,
          comment,
        })
        .then(() => {
          alert("Review submitted successfully.");
          handleDialogClose();
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
        });
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastFlag = currentPage * flagsPerPage;
  const indexOfFirstFlag = indexOfLastFlag - flagsPerPage;
  const currentFlags = flags.slice(indexOfFirstFlag, indexOfLastFlag);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "2rem" }}
      >
        Flag List
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : flags.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Reason
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Raised By
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Resolved
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Comments
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentFlags.map((flag) => (
                  <TableRow key={flag.id}>
                    <TableCell>{flag.title}</TableCell>
                    <TableCell>{flag.reason}</TableCell>
                    <TableCell>
                      {flag.created_by_details
                        ? `${flag.created_by_details.email} (${flag.created_by_details.role})`
                        : "Unknown"}
                    </TableCell>
                    <TableCell>
                      {flag.resolved ? "Verified" : "Pending"}
                    </TableCell>
                    <TableCell>{flag.comments || "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDialogOpen(flag)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

           <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                        marginTop: "0rem",
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#555",
                          fontWeight: "500",
                        }}
                      >
                       Page {currentPage} of {Math.ceil(flags.length / flagsPerPage)}
                      </Typography>
                      <Pagination
                        count={Math.ceil(flags.length / flagsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            fontWeight: "bold",
                            borderRadius: "50%",
                            transition: "background-color 0.3s",
                          },
                          "& .Mui-selected": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#135ba1",
                            },
                          },
                        }}
                      />
                    </Box>
        </>
      ) : (
        <Typography
          variant="body1"
          align="center"
          sx={{ marginTop: "2rem", fontStyle: "italic", color: "#999" }}
        >
          No flags available.
        </Typography>
      )}

      {/* Review Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Review Flag</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Title:</strong> {selectedFlag?.title}
          </Typography>
          <Typography sx={{mt:1}}>
            <strong>Reason:</strong> {selectedFlag?.reason}
          </Typography>
          <TextField
            label="Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
            fullWidth
            sx={{ marginTop: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCommentSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlagList;
