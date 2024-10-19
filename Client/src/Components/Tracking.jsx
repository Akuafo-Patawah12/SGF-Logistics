import { CloseOutlined, SnippetsOutlined, WarningOutlined } from '@ant-design/icons'
import React from 'react'
import "./Components.css"

const Tracking = ({track_comp}) => {
    const [trackPop,setTrackPop] = track_comp

    const style={border:"1px solid #ddd",width:"90%",marginInline:"auto",borderRadius:"5px",padding:"15px 0"}
  return (
    <>
    {trackPop && <div className='Track_pop_container'>
        <main className='Track_pop'>
            <div style={style} className='head_container'>
            <p  className="head">Enter the consign number</p>
            <button onClick={()=> setTrackPop(false)}><CloseOutlined /> </button>
            </div>
        <form className='form'>
            <input type="text" placeholder="Enter tracking id" name="track" id="track" />
            <button type='submit'>Track</button>
            <span className='paste'><SnippetsOutlined/> </span>
        </form>
        <p style={style} className="exg">Exg:  3764hdv8828828</p>

        <section className='note'>
          <WarningOutlined />  NB: Your Consignment No. is the same as the Tracking number, which is sent to the email address you submitted for registration. 

The tracking number is a 13-digit code which starts with the prefix “ILL” and ends with “-SHP”

If you cannot find the email in your inbox, please check your Spam. Kindly get in touch with us if you still have not received your tracking number
        </section>
        </main>
    </div>}
    </>
  )
}

export default Tracking