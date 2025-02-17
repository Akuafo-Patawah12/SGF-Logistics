import React from 'react'
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Oops! The page you are looking for does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      }
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection:"column",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    />
  )
}

export default PageNotFound