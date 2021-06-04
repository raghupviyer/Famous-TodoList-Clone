import React from 'react'
import { SiTodoist } from "react-icons/si";
import {firebase} from '../../firebase';
import {GiHamburgerMenu} from 'react-icons/gi';

const NavBar = ({sideDrawer, setSideDrawer}) => {

  return (
    <div className="navbar justify-content-evenly align-items-center bg-danger">
        <div className="navbar-brand text-light">
          <SiTodoist color="white"/>
          <span className="m-1">ToDoList</span>
        </div>
          <span className="ms-3 btn btn-outline-light d-none d-md-block" onClick={() => {firebase.auth().signOut()}}>
            Sign Out
          </span>
        <h3 className="d-md-none" onClick={() => setSideDrawer(!sideDrawer)}>
        <GiHamburgerMenu color="white"/>
        </h3>
    </div>
  )
}

export default NavBar
