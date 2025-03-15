import React,{useState,useMemo,useEffect,useRef} from 'react'
import SessionExpiredModal from "../Components/SessionEpiredModal";
import {useSearchParams} from "react-router-dom"
import "../Styles/TrackOrder&Map.css"
import io from "socket.io-client"
import { message,Empty } from "antd"

import {route1,route2,route3,route4,route5} from "../Components/Routes"
import  ShipIcon  from "../Icons/ShipIcon"
import  MapShipIcon  from "../Icons/MapShip"
import  Ship2Icon  from "../Icons/Ship2"
import { RightCircleFilled,ArrowRightOutlined, UpOutlined ,CheckOutlined  } from '@ant-design/icons'
import Map, { Marker,  NavigationControl,Source,Layer } from "react-map-gl";


const Mapbox = () => {

  const parent= useRef(null)
  const socket = useMemo(() =>io("https://api.sfghanalogistics.com/tracking",{
    transports: ["websocket","polling"],
    withCredentials: true,
  secure: true
  }),[])
  
  const [route,setRoute] = useState("")
  const [country , setCountry] = useState("")
  const [lineGeoJSON, setLineGeoJSON] = useState(null);
  const [isModalOpen,setIsModalOpen]= useState(false)
useEffect(()=>{
socket.on('connect',()=>{
    console.log("Connected to server")
})

socket.on('get_item_location',(data)=>{
  console.log("tracking order",data)
  setRoute(data.route || "")
  setCountry(data.country || "")
})

socket.on("connect_error",(error)=>{
          console.log(error)
          if(error.message.includes("Refresh token expired")){
            setTimeout(()=>{
              setIsModalOpen(true)
            },1000)
          }
        })

socket.on("disconnect", reason => console.log(reason))
return()=>{
socket.off("connect")
socket.off("get_item_location")
socket.off("connect_error")
socket.off("disconnect")

}
},[socket]);


const [searchParams] = useSearchParams();
const trackingId = searchParams.get("tracking_id");

    

      const pRefs = useRef([]);
      
      
      const routesMap = {
        Guangzhou_Route_1: route1,
        Yiwu_Route_1: route2,
        Guangzhou_Route_2: route3,
        Guangzhou_Route_3: route4,
        Yiwu_Route_2: route5,
        
      };
 

      
       
      
      
  
      const getSeaRoute = async (start, end) => {
        const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        
        
        
        try {
          const response = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${accessToken}&geometries=geojson`
          );
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
      
          if (!data.routes || data.routes.length === 0) {
            console.warn("No sea route found, using default route.");
            return []; // Return empty array to trigger fallback
          }
      
          return data.routes[0].geometry.coordinates; // Valid coordinates
        } catch (error) {
          console.error("Error fetching sea route:", error);
          return []; // Return empty array on error
        }
      };
      
      
      useEffect(() => {
        if (route && routesMap[route]) {
          const rerouteThroughSea = async () => {
            const landCoordinates = routesMap[route].map(({ Longitude, Latitude }) => [Longitude, Latitude]);
      
            const seaCoordinates = await getSeaRoute(
              landCoordinates[0], 
              landCoordinates[landCoordinates.length - 1]
            );
      
            setLineGeoJSON({
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: seaCoordinates.length > 0 ? seaCoordinates : landCoordinates, // Fallback
              },
            });
          };
      
          rerouteThroughSea();
        }
      }, [route]);
      

      

const [xPosition, setXposition] = useState(0);
const [bound, setBound] = useState(0);
const [Index,setIndex] = useState(0)
const [scroll,setScroll] = useState(0)

function Scroll() {
  if (parent.current) {
    const { scrollLeft, scrollTop } = parent.current;

    // Check if horizontal scroll changed
    if (scrollLeft !== scroll) {
      setScroll(scrollLeft);
    }

    // Prevent vertical scrolling
    if (scrollTop !== 0) {
      parent.current.scrollTop = 0;
    }
  }
}
useEffect(() => {
  const element= parent.current
  if (!element) return;
  
  element.addEventListener('scroll', Scroll); // Add scroll event listener
  
  return () => {
    
    element.removeEventListener('scroll', Scroll); // Cleanup on unmount
    
  };
}, [scroll,xPosition]);

const countRef = useRef(null);

// Function to update bound when the country is found
const updateBound = () => {
  if (!pRefs.current) return;

  pRefs.current.forEach((p) => {
    const foundIndex = pRefs.current.findIndex(p => p && p.innerHTML.trim() === country);
    setIndex(foundIndex);

    if (p && p.innerHTML.trim() === country) {
      const rect = p.getBoundingClientRect();
      const newBound = Math.round(rect.left + scroll); // Adjust for scroll
      setBound(newBound);

      // Immediately update position to match the new bound
      

      // Reset animation if already running
      if (countRef.current) clearInterval(countRef.current);

      countRef.current = setInterval(() => {
        setXposition((previousNumber) => {
          if (previousNumber === newBound) {
            clearInterval(countRef.current);
            return previousNumber;
          }

          return previousNumber < newBound ? previousNumber + 1 : previousNumber - 1;
        });
    },10)
    }
    })
    return()=>{
      clearInterval(countRef.current)
    }
    }


// Runs when country or index changes
useEffect(() => {
  updateBound();
}, [country, Index]);

// Runs when window is resized
useEffect(() => {
  const handleResize = () => {
    updateBound(); // Ensure updated position on resize
  };
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
},[xPosition]);



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
  
 useEffect(()=>{
  socket.emit("track",trackingId,(response)=>{
    response.status==="ok"  ? message.success(response.message)  : message.error(response.message);
  })
 },[])
  

 


  return (
    <>
   {routesMap[route] ? <div>
        <div className="headline">
        <div className="line_header">SHIPPING ROUTE FROM CHINA TO GHANA.</div>
         
        </div>
        
        <div className="line_map" ref={parent}>
        <div className="line_inner" >
          
        <div  className="ship" style={{background:"yellow !important",position:"relative"}}><ShipIcon style={{ position: "absolute",top:"-40px", left: `${xPosition-5}px` }} />
         </div>
        <section className="line" style={{position:"relative"}} >
          
        
      {routesMap[route].map((port, index) => (
        <div key={index} className="current_city" >
        <div className="ship-cont">
      <div
        style={{
          background: "var(--green)",
          position: "relative",
          height: "30px",
          width: "30px",
          border:"2px solid #444",
          borderRadius:"50%",
        }}
      >
        {pRefs.current[index]?.getBoundingClientRect &&
          pRefs.current[index].getBoundingClientRect().left +
            Math.round(scroll) <=
            xPosition + 10  && (
            <CheckOutlined style={{ position: "relative", top: "0", left: "0" }} />
          )}
      </div>
      <div className="cordinates">
      <p  ref={(el) => (pRefs.current[index] = el)}>
        {port.countryPort} 
      </p>
      <main>{port.country}</main>
      </div>
    </div>

    {/* Insert Arrow After Every Ship-Cont Except the Last One */}
    {index > 0 && index < routesMap[route].length + 2 ? (
      <ArrowRightOutlined className={`arrow arrow_${index + 1}`} />
    ) : null}
  </div>
))}
    

        </section>
        
        
        </div>

        </div>
       
          <div style={{width:"fit-content",marginInline:"auto",paddingBlock:"10px"}}><a href='#Map' ><button className='route_button'><Ship2Icon /> ROUTE MAP <RightCircleFilled style={{color:"#A7C756",marginLeft:"10px"}}/> </button></a></div>
        <div style={{width:"95%",marginInline:"auto"}}>
        <Map
      initialViewState={{
        latitude: routesMap[route][Index].Latitude,
        longitude: routesMap[route][Index].Longitude,
        zoom: 2,
      }}
      style={{ width: "100%", height:"400px",marginTop:"30px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN}
      id="Map"
    >
      <Marker latitude={routesMap[route][Index].Latitude} longitude={routesMap[route][Index].Longitude}>
        <div><MapShipIcon/></div>
      </Marker>

      <Marker longitude={routesMap[route][0].Longitude} latitude={routesMap[route][0].Latitude} color="blue">
        <div>
          <p style={{ fontSize:"12px", color: "blue" }}>{routesMap[route][0].countryPort}</p>
        </div>
      </Marker>
      <Marker longitude={routesMap[route][1].Longitude} latitude={routesMap[route][1].Latitude} color="green">
        <div>
          <p style={{ fontSize: "12px", color: "green" }}>{routesMap[route][1].countryPort}</p>
        </div>
      </Marker>
      <Marker longitude={routesMap[route][2].Longitude} latitude={routesMap[route][2].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][2].countryPort}</p>
        </div>
      </Marker>

      <Marker longitude={routesMap[route][3].Longitude} latitude={route1[3].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][3].countryPort}</p>
        </div>
      </Marker>

       <Marker longitude={routesMap[route][4].Longitude} latitude={routesMap[route][4].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][4].countryPort}</p>
        </div>
      </Marker>

       <Marker longitude={routesMap[route][5].Longitude} latitude={routesMap[route][5].Latitude} color="red">
        <div>
          <p style={{ fontSize: "12px", color: "red" }}>{routesMap[route][5].countryPort}</p>
        </div>
      </Marker>

      <Marker longitude={routesMap[route][6].Longitude} latitude={routesMap[route][6].Latitude} color="red">
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
            "line-color": "#8A2BE2", // BlueViolet line color
            "line-width": 3, // Line thickness
          }}
        />
      </Source>

     

<NavigationControl position="top-right" />
      {/* Add Popup or other components here */}
    </Map>  
    </div>


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

    </div>: 
     <div style={{height:"400px",display:"flex",alignItems:"center",justifyContent:"center"}}>
     <Empty description={<span style={{ fontSize: "16px", fontWeight: "500",marginLeft:"-25px" }}>No Data Available</span>} />
     </div>
    }
    <SessionExpiredModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> 
    </>
  )
}

export default Mapbox