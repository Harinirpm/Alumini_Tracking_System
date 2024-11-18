import './App.css'
import Sidebar from './Navbars/Sidebar'
import Horizantalbar from './Navbars/Horizantalbar'
import AlumniesList from './Pages/Student/AlumniesList'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AlumniProfile from './Pages/Student/AlumniProfile'
import InternshipLists from './Pages/Student/InternshipLists'
import Chatting from './Pages/chat/ChatProfiles'
import CommonForum from './Pages/CommonForum/CommonForum'
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
          <Route path='/chatting' element={<Chatting />} />
          <Route path="/message-forum" element={<MessageForum />} />
          <Route path='common-forum' element={<CommonForum/>} />
        </Routes>
        </div>
      </div>
      
    </>
  )
}

export default App
