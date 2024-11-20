import './App.css'
import Sidebar from './Navbars/Sidebar'
import Horizantalbar from './Navbars/Horizantalbar'
import AluminiesList from './pages/Student/AlumniesList'
import './App.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import Login from './Login'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import AlumniProfile from './Pages/Student/AlumniProfile'
import InternshipLists from './Pages/Student/InternshipLists'
import Chatting from './Pages/chat/ChatProfiles'
import CommonForum from './Pages/CommonForum/CommonForum'
import MessageForum from './pages/MessageForum'
import ProtectedRoute from './ProtectedRoute'
import axios from 'axios'
import { UserContext } from './UserContext'

function App() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
      axios.get('http://localhost:8081/log')
          .then(res => {
              if (res.data.valid) {
                  setUser({ email: res.data.email, role: res.data.role });
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
        <Sidebar  handleLogout={handleLogout} />
        <Horizantalbar />
        </>)}
        <div className={user?'app':''}>
        
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={['alumni', 'student', 'staff']} />}>
        <Route path="/" element={<AluminiesList />} />
          <Route path='alumni-profile' element={<AlumniProfile />} />
          <Route path="/internship-lists" element={<InternshipLists />} />
          <Route path='/chatting' element={<Chatting />} />
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
