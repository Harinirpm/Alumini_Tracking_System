import React, { useEffect, useState } from 'react';
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
  CircularProgress,
  Pagination,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';

const AdminPage = ({ handleLogout }) => {
  const [alumniProfiles, setAlumniProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 8;

  useEffect(() => {
    // Fetch alumni profiles waiting for approval
    axios
      .get('https://alumini-tracking-system.onrender.com/alumini/profilelist')
      .then((response) => {
        setAlumniProfiles(response.data.rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching alumni profiles:', error);
        setLoading(false);
      });
  }, []);

  // Filter profiles based on search query
  const filteredProfiles = alumniProfiles.filter((profile) =>
    [profile.name, profile.email, profile.department, profile.passed_out_year]
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Calculate the paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        maxHeight: '100vh',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            flexGrow: 1,
            textAlign: 'center',
          }}
        >
          Alumni Profiles Waiting for Approval
        </Typography>
      </Box>

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <CircularProgress />
        </Box>
      ) : filteredProfiles.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Graduation Year</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>
                      <Link
                        to={`/admin/alumni/${profile.email}`}
                        style={{
                          textDecoration: 'none',
                          color: '#1976d2',
                          fontWeight: 'bold',
                        }}
                      >
                        {profile.name}
                      </Link>
                    </TableCell>
                    <TableCell>{profile.email}</TableCell>
                    <TableCell>{profile.department}</TableCell>
                    <TableCell>{profile.passed_out_year}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component={Link}
                        to={`/admin/alumni/${profile.email}`}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              marginTop: '0rem',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontWeight: '500',
              }}
            >
              Page {currentPage} of {Math.ceil(filteredProfiles.length / itemsPerPage)}
            </Typography>
            <Pagination
              count={Math.ceil(filteredProfiles.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s',
                },
                '& .Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#135ba1',
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
          sx={{
            marginTop: '2rem',
            fontStyle: 'italic',
            color: '#999',
          }}
        >
          No alumni profiles matching your search.
        </Typography>
      )}
    </Box>
  );
};

export default AdminPage;
