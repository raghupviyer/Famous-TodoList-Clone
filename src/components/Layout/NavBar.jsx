import React from 'react'
import { SiTodoist } from "react-icons/si";
import {firebase} from '../../firebase';


const NavBar = () => {
  return (
    <div className="navbar justify-content-evenly align-items-center bg-danger">
        <div className="navbar-brand text-light">
          <SiTodoist color="white"/>
          <span className="m-1">ToDoList</span>
        </div>
        <div className="col-">
          <input type="search" placeholder="Search" className="form-control" />
        </div>
        <span className="btn btn-outline-light" onClick={() => {firebase.auth().signOut()}}>
          {/* <IoAdd color="white"/> */}
          Sign Out
        </span>
    </div>
  )
}

export default NavBar
