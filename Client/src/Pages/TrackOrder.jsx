import React from 'react'
import "./TrackOrder.css"
import  { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { useParams } from 'react-router-dom'
import { CheckCircleOutlined ,EnvironmentOutlined } from '@ant-design/icons'

const TrackOrder = () => {
    const {id}= useParams()
    const [viewport, setViewport] = useState({
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 10,
    });
  return (
    <div style={{marginTop:"90px"}}>

<Map
      initialViewState={viewport}
      style={{ width: "100%", height: "300px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoiYWt1YWZvLTEiLCJhIjoiY200MXhxNnJrMDQzNjJrcjAzbXg4cTliMCJ9.6cwG6dff4E2UjnQz7q963A"

    >
      <Marker latitude={37.7749} longitude={-122.4194}>
        <div>📍</div>
      </Marker>
      {/* Add Popup or other components here */}
    </Map>
        <p>{id}</p>
        <div className="line_map">
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
          <p>China</p>
          <p>Sri Lanka</p>
          <p>Tunisia</p>
          <p>Mauritania</p>
          <p>Guinea Bissau</p>
          <p>Cote D'Ivoire</p> 
          <p>Ghana</p>

        </section>
        </div>
          <a href='#Map'><button className='route_button'>ROUTE MAP <EnvironmentOutlined /> </button></a>
        <section className="Map" id="Map"></section>
    </div>
  )
}

export default TrackOrder