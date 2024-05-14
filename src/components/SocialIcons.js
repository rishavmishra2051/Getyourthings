import React from 'react'
import { Link } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
const SocialIcons = () => {
    return (
        <div className="wrapper">
            <Link to="https://www.instagram.com/rishavmishra._?igsh=cTRybmw4eXdwNDB0" className="icon"><span><InstagramIcon className='instagram' /></span></Link>
            <Link to="https://www.linkedin.com/in/rishav-mishra-672851227/" className="icon"><span><LinkedInIcon className='linkedin' /></span></Link>
            <Link to="https://www.facebook.com/rishav.mishra.31149" className="icon"><span><FacebookIcon className='facebook' /></span></Link>
            <Link to="https://github.com/rishavmishra2051" className="icon"><span><GitHubIcon className='github' /></span></Link>
            <Link to="mailto:getyourthingsteam@gmail.com" className="icon"><span><MailOutlineIcon className='mail' /></span></Link>
        </div>
    )
}

export default SocialIcons
