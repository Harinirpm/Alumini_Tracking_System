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
  IconButton,
  Pagination,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import axios from "axios";

const ThreadListPage = () => {
  const [threads, setThreads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState(null);
  const [deleteThreadId, setDeleteThreadId] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
   const { user } = useContext(UserContext);
  const threadsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/allThreads")
      .then((response) => {
        setThreads(response.data);
        setFilteredThreads(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
        setLoading(false);
      });
  }, []);

  const handleViewOpen = (thread) => {
    setSelectedThread(thread);
    setViewDialogOpen(true);
  };

  const handleViewClose = () => {
    setSelectedThread(null);
    setViewDialogOpen(false);
  };

  const handleDeleteOpen = (threadId) => {
    setDeleteThreadId(threadId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteThreadId(null);
    setDeleteReason("");
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!deleteThreadId || !deleteReason) {
        console.error("Thread ID and reason are required.");
        return;
      }

      const requestData = {
        id: deleteThreadId,
        reason: deleteReason,
        user_id: user.id
      };

      const response = await axios.put('http://localhost:8081/admin/rejectThread', requestData);

      alert("Thread deleted successfully:", response.data.message);
      handleDeleteClose();
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Filter threads based on the search query
    if (searchQuery) {
      const filtered = threads.filter((thread) =>
        (thread.thread_domain?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (thread.thread_content?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (thread.created_by_details?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (thread.created_by_details?.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
      setFilteredThreads(filtered);
    } else {
      setFilteredThreads(threads);
    }
  }, [searchQuery, threads]);
  

  // Pagination logic
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = filteredThreads.slice(indexOfFirstThread, indexOfLastThread);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "2rem" }}>
        Thread List
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
          placeholder="Search Threads"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
          <CircularProgress />
        </Box>
      ) : filteredThreads.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Domain</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Content</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Posted By</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#555" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentThreads.map((thread) => (
                  <TableRow key={thread.id} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
                    <TableCell>{thread.thread_domain}</TableCell>
                    <TableCell sx={{
  width:"550px",
  height:"20px",
  overflowY:"auto"
}}>
  {thread.thread_content}
</TableCell>


                    <TableCell>
                      {thread.created_by_details?.name || thread.created_by_details?.email}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={() => handleViewOpen(thread)} sx={{ marginRight: "1rem" }}>
                        View
                      </Button>
                      <Button variant="contained" color="secondary" size="small" onClick={() => handleDeleteOpen(thread.id)}>
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
              Page {currentPage} of {Math.ceil(filteredThreads.length / threadsPerPage)}
            </Typography>
            <Pagination
              count={Math.ceil(filteredThreads.length / threadsPerPage)}
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
        <Typography variant="body1" align="center" sx={{ marginTop: "2rem", fontStyle: "italic", color: "#999" }}>
          No threads available.
        </Typography>
      )}

      {/* View Thread Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleViewClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>Thread Details</DialogTitle>
        <DialogContent>
          {selectedThread && (
            <Box sx={{ margin: "1rem 0" }}>
              <Typography sx={{ my: 1 }}><strong>Domain:</strong> {selectedThread.thread_domain}</Typography>
              <Typography sx={{ my: 1 }}><strong>Content:</strong> {selectedThread.thread_content}</Typography>
              <Typography sx={{ my: 1 }}><strong>Posted By:</strong> {selectedThread.created_by_details?.name || selectedThread.created_by_details?.email}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Reason Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose} maxWidth="sm" fullWidth>
          <DialogContent>
                  <Typography sx={{ marginBottom: "1rem", fontWeight:"500", fontSize:"20px" }}>
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
          <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ThreadListPage;
