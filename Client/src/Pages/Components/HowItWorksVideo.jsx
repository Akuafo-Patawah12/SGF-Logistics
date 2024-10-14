import React from 'react'

const HowItWorksVideo = () => {
  return (
    <div>
        <video
        src="./SFG_images/How_it_works.mp4"
        autoPlay
        loop
        muted
        controls
        style={{ width: "95%", height: "auto" }}
      />
    </div>
  )
}

export default HowItWorksVideo