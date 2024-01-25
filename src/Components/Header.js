import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'

const Header = () => {
    const context = useAuth();

    const handlelogOut = async() => {
        try{
            await context.logOut();
            context.setCurrentUser({});
        }
        catch(err) {
            console.log(err);
        }
    }

    console.log(context);
  return (
    <header>
      <nav>
        <img src="/Images/logo.png" alt="" />
        {
            Object.keys(context.currentUser).length === 0 ? <Link to={'/login'} >Login</Link> : <button onClick={handlelogOut}>Log Out</button>
        }
      </nav>
    </header>
  )
}

export default Header
