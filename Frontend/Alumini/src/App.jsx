import './App.css';
import Sidebar from './Navbars/Sidebar';
import Horizantalbar from './Navbars/Horizantalbar';
import AluminiesList from './pages/Student/AlumniesList';
import { useEffect, useState, useContext } from 'react';
import Login from './authentication/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ChatProfiles from './pages/chat/ChatProfiles';
import CommonForum from './pages/CommonForum/CommonForum';
import MessageForum from './pages/MessageForum';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import { UserContext } from './UserContext';
import AdminPage from './admin/AdminPage';
import AlumniDetailPage from './admin/AlumniDetailPage';
import { Box, Typography } from "@mui/material";
import AdminSidebar from './Navbars/AdminSideBar';
import JobListPage from './admin/JobListPage';
import ThreadListPage from './admin/ThreadListPage';
import AlumniListPage from './admin/AlumniListPage';
import Report from './Component/report/Report';
import InternshipLists from './pages/internship/InternshipLists';

function App() {
  const [alumniData, setAlumniData] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [filteredAlumniData, setFilteredAlumniData] = useState([]);
  const navigate = useNavigate();
  const [verified, setVerified] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('https://alumini-tracking-system.onrender.com/log', {email:user?.email})
      .then((res) => {
        console.log(res)
        if (res.data.valid && res.data.id) {

          setUser({
            email: res.data.email,
            role: res.data.role,
            id: res.data.id,
            otp_verified: true, // Ensure otp_verified is set
          });
        } else {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, setUser]);

  useEffect(() => {
    if (user && user.role === 'alumni') {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`https://alumini-tracking-system.onrender.com/profile/${user.email}`);
          const verifiedStatus = response.data[0].verified;
          console.log(response.data[0])
          if (verifiedStatus === 1) {
            setVerified("Verified");
             // Redirect to home if verified
          } else if (verifiedStatus === 0 && response.data[0].reason_for_rejection === null) {
            setVerified("Not Verified");
            setRejectionReason(""); // Empty rejection reason if not verified yet
          } else {
            setVerified("Rejected");
            setRejectionReason(response.data[0].reason_for_rejection);
          }
        } catch (error) {
          console.error('Error fetching alumni profile:', error);
        }
      };

      fetchProfile(); // Call the function
    }
  }, [user, navigate]);

  const handleLogout = () => {
    axios
      .get('https://alumini-tracking-system.onrender.com/log/logout')
      .then((res) => {
        if (res.data.message) {
          setUser(null);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user && user.otp_verified ? (
        user.role === 'admin' ? (
          <>
  <div className='admin'>
            <AdminSidebar handleLogout={handleLogout} />
       
          <div className='app1'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<AdminPage  handleLogout={handleLogout} />} />
            <Route path="/admin/alumni/:email" element={<AlumniDetailPage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/threads" element={<ThreadListPage />} />
            <Route path="/alumni" element={<AlumniListPage />} />
          </Routes>
          </div>
          </div>
          </>
        ) : user.role === 'student' || user.role === 'staff' || user.role === 'alumni' ? (
          user.otp_verified ? (
            user.role === 'student' || user.role === 'staff' || (user.role === 'alumni' && verified==='Verified') ? (
              <div className="App">
                <Sidebar
                  handleLogout={handleLogout}
                  filteredAlumniData={filteredAlumniData}
                  setFilteredAlumniData={setFilteredAlumniData}
                  alumniData={alumniData}
                  setAlumniData={setAlumniData}
                />
                <Horizantalbar
                handleLogout={handleLogout}
                  filteredAlumniData={filteredAlumniData}
                  setFilteredAlumniData={setFilteredAlumniData}
                  alumniData={alumniData}
                  setAlumniData={setAlumniData}
                />
                <div className="app">
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<ProtectedRoute allowedRoles={['alumni', 'student', 'staff']} />}>
                      <Route path="/home" element={<AluminiesList filteredAlumniData={filteredAlumniData} />} />
                      <Route path="/internship-lists" element={<InternshipLists />} />
                      <Route path="/chatting" element={<ChatProfiles />} />
                      <Route path="/message-forum" element={<MessageForum />} />
                      <Route path="/common-forum" element={<CommonForum />} />
                      <Route path="/report" element={<Report />} />
                    </Route>
                  </Routes>
                </div>
              </div>
            ) : (
              <div>
                {verified === "Not Verified"  ? (
                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    bgcolor="#f9f9f9"
                  >
                    <Box
                      textAlign="center"
                      p={4}
                      borderRadius={2}
                      border="2px solid #1976d2"
                      bgcolor="white"
                      boxShadow={3}
                    >
                      <Typography
                        variant="h6"
                        color="#1976d2"
                        fontWeight="bold"
                      >
                        Your account is not yet verified.
                      </Typography>
                      <Typography variant="body1" mt={1}>
                        You will get an email once verified.
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100vh"
                  bgcolor="#f9f9f9"
                >
                  <Box
                    textAlign="center"
                    p={4}
                    borderRadius={2}
                    border="2px solid #d32f2f"
                    bgcolor="white"
                    boxShadow={3}
                  >
                    <Typography
                      variant="h6"
                      color="#d32f2f"
                      fontWeight="bold"
                    >
                      Your profile has been rejected.
                    </Typography>
                    <Typography variant="body1" mt={1}>
                      Reason: {rejectionReason}
                    </Typography>
                  </Box>
                </Box>
                )}
              </div>
            )
          ) : (
            <div>
              <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100vh"
                  bgcolor="#f9f9f9"
                >
                  <Box
                    textAlign="center"
                    p={4}
                    borderRadius={2}
                    border="2px solid #d32f2f"
                    bgcolor="white"
                    boxShadow={3}
                  >
                    <Typography
                      variant="h6"
                      color="#d32f2f"
                      fontWeight="bold"
                    >
                     Your account is not verified.
                    </Typography>
                    <Typography variant="body1" mt={1}>
                    Please verify your OTP.
                    </Typography>
                  </Box>
                </Box>
             
            </div>
          )
        ) : (
          <div>Invalid role</div>
        )
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
