import './App.css'
import Sidebar from './Navbars/Sidebar'
import Horizantalbar from './Navbars/Horizantalbar'
import AlumniesList from './Student/AlumniesList'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AlumniProfile from './Student/AlumniProfile'
import InternshipLists from './Student/InternshipLists'
function App() {
  return (
    <>
      <div className='App'>
        <Sidebar />
        <Horizantalbar />
        <div className='app'>
        </div>
        <Routes>
        <Route path="/" element={<AlumniesList />} />
          <Route path='alumni-profile' element={<AlumniProfile />} />
          <Route path="/internship-lists" element={<InternshipLists />} />
        </Routes>
      </div>
      
    </>
  )
}

export default App
