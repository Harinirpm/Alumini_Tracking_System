import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);

  const reportsPerPage = 5;

  // Fetch previous reports
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/reports/${user.id}`);
      setReports(response.data.data);
      setFilteredReports(response.data.data); // Initially, show all reports
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleCreateReport = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setTitle("");
    setReason("");
  };

  const handleSubmit = async () => {
    if (!title || !reason) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/report", {
        user_id: user.id,
        title,
        reason,
      });
      if (response.status === 201) {
        alert("Report submitted successfully");
        fetchReports(); // Refresh the table
        handleDialogClose();
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report");
    }
  };

  // Pagination logic
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterReports(event.target.value);
  };

  // Filter reports based on search query
  const filterReports = (query) => {
    const filtered = reports.filter(
      (report) =>
        report.title.toLowerCase().includes(query.toLowerCase()) ||
        report.reason.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography gutterBottom sx={{ fontSize: "26px", fontWeight: "600", mb: 2 }}>
        Report Alumni
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2  }}>
        <Typography sx={{mt:2, mr:1}}>Search : {" "}</Typography>
        <TextField
          label="Search by Title or Reason"
          variant="outlined"
          fullWidth
          value={searchQuery}
          sx={{width:"300px"}}
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateReport}
          sx={{ marginLeft: "20px", width:"160px" }}
        >
          Create Report
        </Button>
      </Box>

      {/* Reports Table */}
      <TableContainer component={Paper} sx={{ maxHeight: "500px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Reason</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Comments</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No reports found.
                </TableCell>
              </TableRow>
            ) : (
              currentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>
                    {report.resolved ? "Resolved" : "Pending"}
                  </TableCell>
                  <TableCell>
                    {report.resolved ? report.comments : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "0px", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
        >
          <Typography variant="body1" sx={{ color: "#555", fontWeight: "500" }}>
            Page {currentPage} of {Math.ceil(filteredReports.length / reportsPerPage)}
          </Typography>
          <Pagination
            count={Math.ceil(filteredReports.length / reportsPerPage)}
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
      </Box>

      {/* Dialog for Creating Report */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Report</DialogTitle>
        <DialogContent>
          <TextField
            label="Title for Report"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Reason for Report"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!title || !reason}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Report;
