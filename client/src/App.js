// import { useRef, useState } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import TopNavigation from './components/TopNavigation';
import Tasks from './components/Tasks';
import Messages from './components/Messages';
import Leaves from './components/Leaves';
function App() {
  
  
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/topNavigation" element={<TopNavigation/>}></Route>
      <Route path="/tasks" element={
       
       <Tasks/>
       }></Route>
      <Route path="/msges" element={<Messages/>}></Route>
      <Route path="/leaves" element={
        <TopNavigation>
         <Leaves/>
        </TopNavigation>

        }></Route>
     </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;


