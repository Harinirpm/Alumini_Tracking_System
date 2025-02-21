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
  Divider,
  IconButton,
  Pagination,
} from "@mui/material";
import { Delete, Visibility, Warning } from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(UserContext);
  const jobsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:8081/jobs")
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  const handleViewOpen = (job) => {
    setSelectedJob(job);
    setViewDialogOpen(true);
  };

  const handleViewClose = () => {
    setSelectedJob(null);
    setViewDialogOpen(false);
  };

  const handleDeleteOpen = (jobId) => {
    setDeleteJobId(jobId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteJobId(null);
    setDeleteReason("");
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Validate inputs
      if (!deleteJobId || !deleteReason) {
        console.error("Job ID and reason are required.");
        return;
      }
  
      // Prepare data to send to the backend
      const requestData = {
        id: deleteJobId,
        reason: deleteReason,
        user_id: user.id, // Replace with the actual user ID if applicable
      };
  
      // Make the API call
      const response = await axios.put('http://localhost:8081/admin/rejectJob', requestData);
  
      // Handle success
      alert("Job rejected successfully:", response.data.message);
      handleDeleteClose(); // Close the modal or reset UI after success
    } catch (error) {
      // Handle errors
      if (error.response) {
        console.error("Error rejecting job:", error.response.data.error);
      } else {
        console.error("Network error:", error.message);
      }
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter((job) =>
      `${job.job_title} ${job.company_name} ${job.location} ${job.name}`
        .toLowerCase()
        .includes(query)
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Get the jobs to display on the current page
  // Get the jobs to display on the current page (use filteredJobs)
const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;
const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);


  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "2rem" }}
      >
        Job Listings
      </Typography>

      <Box
  sx={{
    display: "flex",
    alignItems:"center",
    justifyContent: "flex-end", // Aligns the TextField to the right
    width: "100%", // Ensures it takes full width of the container
  }}
> <Typography sx={{mb:2, mr:1}}>Search : {" "}</Typography>
  <TextField
    fullWidth
    placeholder="Search by job title, company, location, or poster..."
    value={searchQuery}
    onChange={handleSearch}
    variant="outlined"
    sx={{
      marginBottom: "1.5rem",
      width: "400px", // Set the desired width
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ccc",
        },
        "&:hover fieldset": {
          borderColor: "#1976d2",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#1976d2",
          borderWidth: "2px",
        },
      },
      "& input": {
        padding: "12px",
      },
    }}
  />
</Box>



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
      ) : filteredJobs.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Job Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Company
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Location
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Posted By
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentJobs.map((job) => (
                  <TableRow
                    key={job.id}
                    sx={{
                      "&:hover": { backgroundColor: "#f9f9f9" },
                      transition: "background-color 0.3s",
                    }}
                  >
                    <TableCell>{job.job_title}</TableCell>
                    <TableCell>{job.company_name}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>
                      {job.name} ({job.role})
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleViewOpen(job)}
                        sx={{ marginRight: "1rem" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeleteOpen(job.id)}
                      >
                        Delete
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
    Page {currentPage} of {Math.ceil(filteredJobs.length / jobsPerPage)}
  </Typography>
  <Pagination
    count={Math.ceil(filteredJobs.length / jobsPerPage)}
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
          No job listings available.
        </Typography>
      )}

      {/* View Job Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleViewClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Job Details
        </DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Box sx={{ margin: "1rem 0" }}>
              <Typography sx={{my:1}}>
                <strong>Title:</strong> {selectedJob.job_title}
              </Typography>
             
              <Typography sx={{my:1}}>
                <strong>Company:</strong> {selectedJob.company_name}
              </Typography>
             
              <Typography sx={{my:1}}>
                <strong>Location:</strong> {selectedJob.location}
              </Typography>
             
              <Typography sx={{my:1}}>
                <strong>Salary:</strong>{" "}
                {selectedJob.expected_minimum_salary_per_year}L -{" "}
                {selectedJob.expected_maximum_salary_per_year}L
              </Typography>
            
              <Typography sx={{my:1}}>
                <strong>Posted By:</strong> {selectedJob.name} (
                {selectedJob.role})
              </Typography>
             
              <Typography sx={{my:1}}>
                <strong>Offer URL:</strong>{" "}
                <a
                  href={selectedJob.offer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedJob.offer_url}
                </a>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Job Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <Warning color="error" sx={{ marginRight: "0.5rem" }} />
          Delete Job
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ marginBottom: "1rem" }}>
            Provide a reason for deleting this job:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={!deleteReason.trim()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

export default JobListPage;
