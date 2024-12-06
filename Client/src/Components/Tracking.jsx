import { CloseOutlined, SnippetsOutlined, WarningOutlined } from '@ant-design/icons'
import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Components.css"

const Tracking = ({track_comp,trackRef}) => {
    const [trackPop,setTrackPop] = track_comp

    

    const [tracking_id,setTracking_id] =React.useState("")
    const navigate= useNavigate()
    function Track(e){
       e.preventDefault()
       navigate(`/Track_order/${tracking_id}`)
       setTrackPop(false)

    }

    async function paste(){
      try{
        let text= await navigator.clipboard.readText()
      setTracking_id(prev=> prev + text)
      }catch(err){
        console.log("failed to paste text")
      }
    }

    const style={border:"1px solid #ddd",width:"88%",marginInline:"auto",borderRadius:"5px",padding:"15px 0 15px 2%"}
  return (
    <>
    {trackPop && <div className='Track_pop_container' style={{animation:`${trackPop ? "0.5s showTrackPop linear":""}`}}>
        <main ref={trackRef} className='Track_pop'>
            <div style={style} className='head_container'>
            <p  className="head">Enter the tracking number</p>
            <button onClick={()=> setTrackPop(false)}><CloseOutlined /> </button>
            </div>
        <form onSubmit={Track} className='form'>
            <input type="text" value={tracking_id} placeholder="Enter tracking id" onChange={(e)=>setTracking_id(e.target.value)} name="track" id="track" />
            <button type='submit'>Track</button>
            <span className='paste' onClick={()=>paste()}><SnippetsOutlined/> </span>
        </form>
        <p style={style} className="exg"><span style={{fontWeight:"600",fontSize:"15px"}}>Exg:</span>  3764hdv8828828</p>

        <section className='note'>
          <WarningOutlined style={{color:"rgb(199, 46, 46)"}}/> <span style={{fontWeight:"600",fontSize:"16px",color:"black"}}>NB:</span> Your Consignment No. is the same as the Tracking number, which is sent to the email address you submitted for registration. 

The tracking number is a 13-digit code which starts with the prefix “ILL” and ends with “-SHP”

If you cannot find the email in your inbox, please check your Spam. Kindly get in touch with us if you still have not received your tracking number
        </section>
        </main>
    </div>}
    </>
  )
}

export default Tracking