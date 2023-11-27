import { useEffect, useState } from 'react'
import './App.css'
import Auth from './Containers/Auth'
import Chatscreen from './Containers/Chatscreen'
import Sidebar from './Containers/Sidebar'

function App() {
  let token = localStorage.getItem('token') || false
  const [isAuthenticated, setIsAuthenticated] = useState(token)
  const [activeId, setActiveId] = useState('1');
  const [userList, setUserList] = useState([]);

  return (
    <>
      <div className='main-container'>

        {
          !isAuthenticated && <Auth setIsAuthenticated={setIsAuthenticated}/>
        }
        {
          isAuthenticated && <Sidebar activeId={activeId} setActiveId={setActiveId} userList={userList} setUserList={setUserList}/>
        }
        {
          isAuthenticated && <Chatscreen activeId={activeId} setActiveId={setActiveId} userList={userList} setUserList={setUserList}/>
        }
      </div>
    </>
  )
}

export default App
