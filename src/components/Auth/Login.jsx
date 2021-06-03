import {useContext, useEffect, useState} from 'react'
import { Redirect, withRouter } from 'react-router';
import { AuthContext } from '../../context/Auth';
import {firebase} from '../../firebase'
import image from '../../assets/screenshot.png'

const Login = ({history}) => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const currentUser = useContext(AuthContext)
  const handleLogin = 
    async (e) => {
      e.preventDefault();
      // const {email, password} = e.target.elements;
      try{
        isNewUser
        ?await firebase.auth().createUserWithEmailAndPassword(emailId, password)
        :await firebase.auth().signInWithEmailAndPassword(emailId, password)
        history.push("/")
      }
      catch(error){
        alert(error)
      }
    }

  return (
    <div className="row">
      {currentUser && <Redirect to="/"/>}
      <div className="col">
      <h1 className="">{isNewUser? "Sign Up": "LogIn"}</h1>
      <form class="mt-3 mb-3">
        <div class="">
          <label for="inputEmail4" class="form-label">Email</label>
          <input type="email" onChange={(e) => setEmailId(e.target.value)} value={emailId} class="form-control" id="inputEmail4"/>
        </div>
        <div class="mb-3">
          <label for="inputPassword4" class="form-label">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} class="form-control" id="inputPassword4"/>
        </div>
        <button className="btn btn-outline-primary" type="submit" onClick={handleLogin}>{isNewUser? "Sign Up": "LogIn"}</button>
      </form>
        <button className="btn btn-primary text-light" onClick={() => setIsNewUser(!isNewUser)}>{isNewUser? "Not New User": "New User?"}</button>
    </div>
    <img src={`${image}`} alt="screenshot" className="img-fluid col-9" />
    </div>
  )
}

export default withRouter(Login)
