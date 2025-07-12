import React from 'react'
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';
function Dashboard() {
  let userDetails = useSelector((store)=>{
    return store.userDetails;
  })
  return (
    <div>
      <TopNavigation></TopNavigation>
      <h1>Dashboard</h1>
      <h1>{userDetails.firstName}{userDetails.lastName}</h1>
      <img src={`http://localhost:3333/${userDetails.profilePic}`} alt=''></img>
    </div>
  )
}

export default Dashboard
