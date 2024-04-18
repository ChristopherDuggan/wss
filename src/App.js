import {Routes, Route, useNavigate} from 'react-router-dom'
import Profile from './pages/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';
import Homepage from './pages/Homepage';
import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const URL = "http://localhost:4000/api/"

  const handleSignUp = async(user) => {
    const response = await fetch(URL + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user) 
    })
    const data = await response.json()
    console.log(data)
    navigate("/login")
  }

  const handleLogin = async(user) => {
    const response = await fetch(URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    console.log(data)
    // if status is NOT 200(OK)
    if(response.status !== 200 || !data.token){
      return data
    }
    localStorage.setItem("authToken", data.token)
    setIsLoggedIn(true)
    navigate(`/profile/${data.id}`)
  }

  const handleLogout = () => {
    console.log("in handle logout")
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    navigate("/")
  }

  const fetchUser = async (id) => {
    // get logged in user's token
    const token = localStorage.getItem("authToken")
    if(token){
      const response = await fetch(URL + `user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": token // bearerHeader variable on the backend
        }
      })
      const data = await response.json()
      console.log(data)
      setUser(data.data)
    } else {
      console.log("no token")
    }
  }

  useEffect(()=>{
    // this will help with render UI for Nav when user refreshes the page
    let token = localStorage.getItem("authToken")
    // token doesnt exist in local storage? 
    if(!token){
      setIsLoggedIn(false) // they are logged out
    } else {
      setIsLoggedIn(true) // they are logged in 
    }
  }, [])

  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/signup' element={<Signup handleSignUp={handleSignUp}/>}/>
        <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
        <Route path='/profile/:id' element={<Profile fetchUser={fetchUser} user={user}/>}/>
      </Routes>
    </div>
  );
}

export default App;
