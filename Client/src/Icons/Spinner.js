import "./Icons.css"
const spinner= () => {
    return (
        <div style={{width:"100%",margin:"20px 0",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div className="spinner"></div>
            <p style={{transform:"translateY(10px)",fontWeight:"bold"}}>Loading...</p>
        </div>
    );
}

export default spinner;