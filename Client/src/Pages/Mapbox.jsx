import React from 'react'
import "./TrackOrder&Map.css"
import  { useState,useEffect } from "react";
import {route1,route2,route3,route4,route5} from "./Components/Routes"
import{ ReactComponent as ShipIcon } from "../Icons/ShipIcon.svg"
import{ ReactComponent as Ship2Icon } from "../Icons/Ship2.svg"
import { CheckCircleOutlined,RightCircleFilled,ArrowRightOutlined, UpOutlined ,CheckOutlined ,EnvironmentOutlined } from '@ant-design/icons'
import Map, { Marker,  NavigationControl,Source,Layer } from "react-map-gl";


const Mapbox = () => {

    const [viewport,setViewport] = useState({
        latitude: 23.0848,
        longitude: 113.4348,
        zoom: 2,
      });
  
      const lineGeoJSON = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [route1[0].Longitude,route1[0].Latitude],
            [route1[1].Longitude,route1[1].Latitude],
            [route1[2].Longitude,route1[2].Latitude],
            [route1[3].Longitude,route1[3].Latitude],
            [route1[4].Longitude,route1[4].Latitude],
            [route1[5].Longitude,route1[5].Latitude],
            [route1[6].Longitude,route1[6].Latitude],
            ],
        },
        properties: {},
      };

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
    <div>
        <div className="headline">
        <div className="line_header">SHIPPING ROUTE FROM CHINA TO GHANA.</div>
        </div>
        
        <div className="line_map">
        <div className="line_inner">
         
        <div  className="ship"><ShipIcon style={{transform:"translateX(30%)"}}/></div>
        <section className="line" style={{position:"relative"}}>
          
          <div className='current_city '>
          <div>

          <span><CheckOutlined style={{position:"absolute"}} /> </span>
          <p>{route1[0].countryPort}</p>

          </div>
          </div>
          <ArrowRightOutlined className="arrow arrow_1" />
          <div className='current_city'>
          <div>
          <span> </span>
          <p>{route1[1].countryPort}</p>
          </div>
          </div>
          <ArrowRightOutlined className="arrow arrow_2" />
          <div className='current_city'>
          <div><span> </span>
          <p>{route1[2].countryPort}</p>
          </div>
          </div>
          <ArrowRightOutlined className="arrow arrow_3" />
          <div className='current_city'>
          <div><span> </span>
          <p>{route1[3].countryPort}</p>
          </div>
          </div>
          <ArrowRightOutlined className="arrow arrow_4" />
          <div className='current_city'>
             <div><span> </span>
             <p>{route1[4].countryPort}</p>
              </div>
          </div>
          <ArrowRightOutlined className="arrow arrow_5" />
          <div className='current_city'>
          <div><span> </span> 
          <p>{route1[5].countryPort}</p>
           </div>
          </div>
          <ArrowRightOutlined className="arrow arrow_6" />
          <div className='current_city'>
          <div><span> </span>
          <p>{route1[6].countryPort}</p>
           </div>
          </div>

        </section>
        
        
        </div>

        </div>
       
          <div style={{width:"fit-content",marginInline:"auto",paddingBlock:"10px"}}><a href='#Map' ><button className='route_button'><Ship2Icon /> ROUTE MAP <RightCircleFilled style={{color:"#A7C756",marginLeft:"10px"}}/> </button></a></div>
        
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

      <Marker longitude={route1[0].Longitude} latitude={route1[0].Latitude} color="blue">
        <div>
          <p style={{ fontSize:"12px", color: "blue" }}>{route1[0].countryPort}</p>
        </div>
      </Marker>
      <Marker longitude={route1[1].Longitude} latitude={route1[1].Latitude} color="green">
        <div>
          <p style={{ fontSize: "12px", color: "green" }}>{route1[1].countryPort}</p>
        </div>
      </Marker>
      <Marker longitude={route1[2].Longitude} latitude={route1[2].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{route1[2].countryPort}</p>
        </div>
      </Marker>

      <Marker longitude={route1[3].Longitude} latitude={route1[3].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{route1[3].countryPort}</p>
        </div>
      </Marker>

       <Marker longitude={route1[4].Longitude} latitude={route1[4].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{route1[4].countryPort}</p>
        </div>
      </Marker>

       <Marker longitude={route1[5].Longitude} latitude={route1[5].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{route1[5].countryPort}</p>
        </div>
      </Marker>

      <Marker longitude={route1[6].Longitude} latitude={route1[6].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{route1[6].countryPort}</p>
        </div>
      </Marker>

      {/* Add Line */}
      <Source id="line-source" type="geojson" data={lineGeoJSON}>
        <Layer
          id="line-layer"
          type="line"
          paint={{
            "line-color": "#FF5733", // Line color (orange-red)
            "line-width": 3, // Line thickness
          }}
        />
      </Source>

     

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

export default Mapbox