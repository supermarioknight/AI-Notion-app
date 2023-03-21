import React, {useState, useEffect} from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { login } from '../../store/session'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  // if (sessionUser) navigate('/home')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };


  return (
    <div className="login-container">
      <div className="h1login">Log in</div>
        <form onSubmit={handleSubmit}>

          <ul>
          {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
              ))}
          </ul>

          <div className="email">
            <label className="login-label">
              Email
            </label>
            <input
            className="login-input" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeHolder="Enter your email address.."
            required
            />
          </div>

          <div className="login">
            <label className="login-label">
              Password
            </label>
            <input 
            className="login-input" 
            type="text" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeHolder="Enter your password.."
            required
            />
          </div>

          
            <button className="login-submit">Submit</button>
            
          
        </form>

    </div>
  )
}