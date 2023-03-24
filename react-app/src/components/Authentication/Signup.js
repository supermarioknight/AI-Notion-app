import React, {useState, useEffect} from 'react'
import { authenticate } from '../../store/session'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { signUp } from '../../store/session'
import { login } from '../../store/session'

export default function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUserName] = useState("")
  const [errors, setErrors] = useState([])

  if (sessionUser) navigate('/home')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault()
    const email = "demo@aa.io"
    const password = "password"
    await dispatch(login(email, password))
  }

  return (
    <div className="login-container">
      <div className="h1login">Sign Up</div>
        <form onSubmit={handleSubmit}>

          <ul>
          {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
              ))}
          </ul>
          <div className="login-name">
          <label className="login-label">
              What should we call you? 
            </label>
            <input
            className="login-input" 
            type="text" 
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeHolder="e.g. Ada Lovelace, Ada, AL"
            required
            />
          </div>

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
          <button onClick={handleDemo} className="login-submit">Demo User</button>

        </form>

    </div>
  )
}
