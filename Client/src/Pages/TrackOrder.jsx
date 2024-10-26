import React from 'react'
import { useParams } from 'react-router-dom'

const TrackOrder = () => {
    const {id}= useParams()
  return (
    <div style={{marginTop:"90px"}}>
        {id}
    </div>
  )
}

export default TrackOrder