import {useContext, useState} from 'react'
import { Redirect, withRouter } from 'react-router';
import { AuthContext } from '../../context/Auth';
import {firebase} from '../../firebase'
import { SiTodoist } from "react-icons/si";

const Login = ({history}) => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const currentUser = useContext(AuthContext)
  const handleLogin = 
    async (e) => {
      e.preventDefault();
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
    <div className="row col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-10 col-11 mx-auto mt-5 card justify-self-center">
      {currentUser && <Redirect to="/"/>}
      <div className="card-body p-0">
      <h4 className="card-header"><SiTodoist/><span className="ms-2">{isNewUser? "Sign Up": "LogIn"}</span></h4>
      <div className="m-3">
        <div className="mb-3">
          <label for="inputEmail4" className="form-label">Email</label>
          <input type="email" onChange={(e) => setEmailId(e.target.value)} value={emailId} className="form-control" id="inputEmail4"/>
        </div>
        <div className="mb-3">
          <label for="inputPassword4" className="form-label">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword4"/>
        </div>
        <div className="">
          <button className="btn btn-outline-primary" type="submit" onClick={handleLogin}>{isNewUser? "Sign Up": "LogIn"}</button>
          <button className="btn btn-primary text-light ms-4" onClick={() => setIsNewUser(!isNewUser)}>{isNewUser? "Not New User": "New User?"}</button>
        </div>
      </div>
        <div className="card-footer m-0">
          Test account: <br/>
          email - test@test.com <br/>
          password - testtest <br/>
        </div>
    </div>
    </div>
  )
}

export default withRouter(Login)
