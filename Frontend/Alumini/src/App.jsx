import './App.css'
import Sidebar from './Navbars/Sidebar'
import Horizantalbar from './Navbars/Horizantalbar'
import AlumniesList from './Student/AlumniesList'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AlumniProfile from './Student/AlumniProfile'
import InternshipLists from './Student/InternshipLists'
import MessageForum from './pages/MessageForum'
function App() {
  return (
    <>
      <div className='App'>
        <Sidebar />
        <Horizantalbar />
        <div className='app'>
        
        <Routes>
        <Route path="/" element={<AlumniesList />} />
          <Route path='alumni-profile' element={<AlumniProfile />} />
          <Route path="/internship-lists" element={<InternshipLists />} />
          <Route path="/message-forum" element={<MessageForum />} />
        </Routes>
        </div>
      </div>
      
    </>
  )
}

export default App
