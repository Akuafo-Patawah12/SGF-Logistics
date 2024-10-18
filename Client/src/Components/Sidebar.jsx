import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Components.css"
const Sidebar = ({popUp,popRef}) => {
  return (
    <>
    {popUp && <aside>
        <nav ref={popRef} style={{animation:`${popUp ? "side-appear 0.4s linear": "side-disappear 0.4s linear"}`}} className='side_nav'>
            <NavLink to={"/"}><button>Home</button></NavLink>
            <NavLink to={"/About"}><button>About</button></NavLink>
            <NavLink to={"/Services"}><button>Services</button></NavLink>
            <NavLink to={"/Contact"}><button>Contact</button></NavLink>
            <NavLink to={"/More"}><button>More</button></NavLink>
        </nav>
    </aside>}
    </>
  )
}

export default Sidebar