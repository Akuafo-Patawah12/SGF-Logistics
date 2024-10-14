import React from 'react'
import "./Components.css"
const Sidebar = ({popUp,popRef}) => {
  return (
    <>
    {popUp && <aside>
        <nav ref={popRef} style={{animation:`${popUp ? "side-appear 0.4s linear": "side-disappear 0.4s linear"}`}} className='side_nav'>
            <button>Home</button>
            <button>About</button>
            <button>Service</button>
            <button>Contact</button>
            <button>More</button>
        </nav>
    </aside>}
    </>
  )
}

export default Sidebar