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
  Grid
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import axios from "axios";

const AlumniListPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [deleteAlumnusId, setDeleteAlumnusId] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedEmail, setDeletedEmail] = useState("");
  const alumniPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:8081/alumini/list")
      .then((response) => {
        setAlumni(response.data.rows);
        setFilteredAlumni(response.data.rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching alumni:", error);
        setLoading(false);
      });
  }, []);

  const handleViewOpen = (alumnus) => {
    setSelectedAlumnus(alumnus);
    setViewDialogOpen(true);
  };

  const handleViewClose = () => {
    setSelectedAlumnus(null);
    setViewDialogOpen(false);
  };

  const handleDeleteOpen = (id, email) => {
    setDeleteAlumnusId(id);
    setDeletedEmail(email)
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteAlumnusId(null);
    setDeleteReason("");
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!deleteAlumnusId || !deleteReason) {
        alert("Reason is required.");
        return;
      }

      await axios.post(`http://localhost:8081/alumini/reject/${deleteAlumnusId}/${deletedEmail}`, {
          reason: deleteReason 
      });
      alert("Alumni removed successfully.");
      setAlumni(alumni.filter((alumnus) => alumnus.id !== deleteAlumnusId));
      setFilteredAlumni(
        filteredAlumni.filter((alumnus) => alumnus.id !== deleteAlumnusId)
      );
      handleDeleteClose();
    } catch (error) {
      console.error("Error deleting alumnus:", error);
      alert("Failed to delete alumnus.");
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = alumni.filter((alumnus) =>
      `${alumnus.name} ${alumnus.company_name} ${alumnus.location} ${alumnus.department}`
        .toLowerCase()
        .includes(query)
    );
    setFilteredAlumni(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastAlumnus = currentPage * alumniPerPage;
  const indexOfFirstAlumnus = indexOfLastAlumnus - alumniPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstAlumnus, indexOfLastAlumnus);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: "2rem" }}
      >
        Alumni List
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Typography sx={{mt:2, mr:1}}>Search : {" "}</Typography>
        <TextField
          placeholder="Search by name, company, or department"
          value={searchQuery}
          onChange={handleSearch}
          variant="outlined"
          sx={{ width: "300px" }}
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
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentAlumni.map((alumnus) => (
                  <TableRow key={alumnus.id}>
                    <TableCell>{alumnus.name}</TableCell>
                    <TableCell>{alumnus.department}</TableCell>
                    <TableCell>{alumnus.company_name}</TableCell>
                    <TableCell>{alumnus.location}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewOpen(alumnus)}
                        startIcon={<Visibility />}
                        sx={{ marginRight: "1rem" }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteOpen(alumnus.user_id, alumnus.email)}
                        startIcon={<Delete />}
                      >
                        Remove
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
              Page {currentPage} of {Math.ceil(filteredAlumni.length / alumniPerPage)}
            </Typography>
            <Pagination
              count={Math.ceil(filteredAlumni.length / alumniPerPage)}
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
      )}

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleViewClose} maxWidth="sm" fullWidth>
        <DialogTitle>Alumnus Details</DialogTitle>
        <DialogContent>
  {selectedAlumnus && (
    <Grid container spacing={2}>
      {selectedAlumnus.profile_image_path && (
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <img
            src={`http://localhost:8081/${selectedAlumnus.profile_image_path.replace(/\\/g, '/')}`}
            alt={`${selectedAlumnus.name}'s profile`}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '16px',
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography>
          <strong>Name:</strong> {selectedAlumnus.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Email:</strong> {selectedAlumnus.email}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Phone:</strong> {selectedAlumnus.phone_number}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Gender:</strong> {selectedAlumnus.gender}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Date of Birth:</strong> {selectedAlumnus.date_of_birth}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Degree:</strong> {selectedAlumnus.degree}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Department:</strong> {selectedAlumnus.department}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Graduation Year:</strong> {selectedAlumnus.passed_out_year}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Roll No:</strong> {selectedAlumnus.roll_no}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Role:</strong> {selectedAlumnus.role}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Company:</strong> {selectedAlumnus.company_name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Location:</strong> {selectedAlumnus.location}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Experience:</strong> {selectedAlumnus.years_of_experience} years
        </Typography>
      </Grid>
      {selectedAlumnus.linkedin && (
        <Grid item xs={12}>
          <Typography>
            <strong>LinkedIn:</strong>{' '}
            <a href={selectedAlumnus.linkedin} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </Typography>
        </Grid>
      )}
      {selectedAlumnus.verification_document && (
        <Grid item xs={12}>
          <Typography>
            <strong>Verification Document:</strong>{' '}
            <a
              href={`http://localhost:8081/${selectedAlumnus.verification_document.replace(/\\/g, '/')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Document
            </a>
          </Typography>
        </Grid>
      )}
    </Grid>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose} maxWidth="xs" fullWidth>
        <DialogTitle>Reason for Removal</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            placeholder="Enter reason for removal"
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlumniListPage;
