import React,{useEffect} from 'react'
import "./TrackOrder.css"
import { UpOutlined } from '@ant-design/icons';
import  { useState } from "react";
import Map, { Marker,  NavigationControl } from "react-map-gl";
import { useParams } from 'react-router-dom'
import{ ReactComponent as ShipIcon } from "../Icons/ShipIcon.svg"
import{ ReactComponent as Ship2Icon } from "../Icons/Ship2.svg"
import { CheckCircleOutlined ,EnvironmentOutlined } from '@ant-design/icons'
import {route1,route2,route3,route4,route5} from "./Components/Routes"
import { transform } from 'framer-motion';

const TrackOrder = () => {
    const {id}= useParams()
    const [viewport,setViewport] = useState({
      latitude: 23.0848,
      longitude: 113.4348,
      zoom: 10,
    });

    
    const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
    const [showButton, setShowButton] = useState(false); // Show/hide the back-to-top button
  
    // Handle the scroll event
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      if (position > 300) { // Show the button after 300px scroll
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    // Scroll to the top when the button is clicked
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll); // Add scroll event listener
      return () => {
        window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
      };
    }, []);
  
  return (
    <div style={{marginTop:"90px"}}>


        
        <div className="line_map">
        <div className="line_inner">
        <div  className="ship"><ShipIcon style={{transform:"translateX(-25px)"}}/></div>
        <section className="line">
          <div className='current_city China'>
          <div><CheckCircleOutlined/> </div>
          <div><CheckCircleOutlined/> </div>
          </div>
          <div className='current_city'>
          <div><CheckCircleOutlined/> </div>
          </div>
          <div className='current_city'>
          <div><CheckCircleOutlined/> </div>
          </div>

          <div className='current_city'>
             <div> <CheckCircleOutlined/> </div>
          </div>
          <div className='current_city'>
          <div><CheckCircleOutlined/>  </div>
          </div>
          <div className='current_city'>
          <div><CheckCircleOutlined/>  </div>
          </div>

        </section>
        <section className="line2">
          <p>{route1[0].country}</p>
          <p>{route1[1].country}</p>
          <p>{route1[2].country}</p>
          <p>{route1[3].country}</p>
          <p>{route1[4].country}</p>
          <p>{route1[5].country}</p> 
          <p>{route1[6].country}</p>

        </section>
        </div>
        </div>
          <div style={{width:"fit-content",marginInline:"auto",paddingBlock:"10px"}}><a href='#Map' ><button className='route_button'><Ship2Icon /> ROUTE MAP <EnvironmentOutlined /> </button></a></div>
        
        <Map
      initialViewState={viewport}
      style={{ width: "100%", height:"400px",marginTop:"30px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoiYWt1YWZvLTEiLCJhIjoiY200MXhxNnJrMDQzNjJrcjAzbXg4cTliMCJ9.6cwG6dff4E2UjnQz7q963A"
      id="Map"
    >
      <Marker latitude={23.0848} longitude={113.4348}>
        <div><ShipIcon/></div>
      </Marker>

     

<NavigationControl position="top-right" />
      {/* Add Popup or other components here */}
    </Map>  


    {showButton && (
        <button
          className="back-to-top"
          style={{
            borderWidth: `${Math.min(scrollPosition / 10, 100)}%`, // Border grows as you scroll
          }}
          onClick={scrollToTop}
        >
          <UpOutlined />
        </button>
      )}
    </div>
  )
}

export default TrackOrder