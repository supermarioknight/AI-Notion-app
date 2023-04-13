import React, {useEffect} from 'react'
import Navigation from './Navigation'
import './SplashPage.css'
import NotionTitle from './notiontitle.PNG'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import SplashImage from './SplashImage.PNG'
import Companies from './companies.PNG'
import { authenticate } from '../../store/session'
import { useDispatch } from 'react-redux'
import AI from './Notion_AI.png'

export default function SplashPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignupClick = () => {
    navigate("/signup")
  }

  // useEffect(() => {
  //   dispatch(authenticate())
  // }, [dispatch])

  return ( 
      <div className='splashpage-container'>
        <Navigation/>

          <img className="title-img" src={NotionTitle} alt="" />  

          <div className="title-caption">AIdea is the connected workspace where better, faster work happens and ideas come to life.</div>

          <button onClick={handleSignupClick} className="splash-signup">Get AIdea Free <span>&#x2192;</span> </button>

          <img style={{marginTop: 20}} src={SplashImage} alt="" />

          <div className="millions">Millions run on AIdea every day</div>

          <div className="powering">Powering the world's best teams, from next-generation startups to established enterprises.</div>

          <NavLink style={{textDecoration: "none"}} className="powering" >Read Customer Stories <span>&#x2192;</span></NavLink>

          <img style={{marginTop: 15}} src={Companies} alt="" />
      </div>
  )
}
    