import './App.css'
import Sidebar from './Navbars/Sidebar'
import Horizantalbar from './Navbars/Horizantalbar'
import AluminiesList from './pages/Student/AlumniesList'
import './App.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import Login from './Login'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import InternshipLists from './Pages/Student/InternshipLists'
import ChatProfiles from './Pages/chat/ChatProfiles'
import CommonForum from './Pages/CommonForum/CommonForum'
import MessageForum from './pages/MessageForum'
import ProtectedRoute from './ProtectedRoute'
import axios from 'axios'
import { UserContext } from './UserContext'
import { useState } from 'react'

function App() {
  const [alumniData, setAlumniData] = useState([])
  const { user, setUser } = useContext(UserContext);
  const [filteredAlumniData, setFilteredAlumniData] = useState([])
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
      axios.get('http://localhost:8081/log')
          .then(res => {
              if (res.data.valid) {
                  setUser({ email: res.data.email, role: res.data.role, id: res.data.id });
              } else {
                  navigate('/login');
              }
          })
          .catch(err => console.log(err));
  }, [navigate, setUser]);

  const handleLogout = () => {
    axios.get('http://localhost:8081/log/logout')
        .then(res => {
            if (res.data.message) {
                setUser(null);
                navigate('/login');
            }
        })
        .catch(err => console.log(err));
};


  return (
    <>
      <div className='App'>
      {user && (user.role) && (<>
        <Sidebar  handleLogout={handleLogout} filteredAlumniData={filteredAlumniData} setFilteredAlumniData={setFilteredAlumniData} alumniData={alumniData} setAlumniData={setAlumniData} />
        <Horizantalbar filteredAlumniData={filteredAlumniData} setFilteredAlumniData={setFilteredAlumniData} alumniData={alumniData} setAlumniData={setAlumniData} />
        </>)}
        <div className={user?'app':'App'} style={{backgroundColor:""}}>
        
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={['alumni', 'student', 'staff']} />}>
        <Route path="/" element={<AluminiesList filteredAlumniData={filteredAlumniData} />} />
          <Route path="/internship-lists" element={<InternshipLists />} />
          <Route path='/chatting' element={<ChatProfiles />} />
          <Route path="/message-forum" element={<MessageForum />} />
          <Route path='common-forum' element={<CommonForum/>} />
          </Route>
        </Routes>
        </div>
      </div>
      
    </>
  )
}

export default App
