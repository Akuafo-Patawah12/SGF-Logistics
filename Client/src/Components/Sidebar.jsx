import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Layout, Menu, Button, Drawer } from "antd";
import { ReactComponent as SvgIcon } from "../Icons/svgl_svg_format_2.svg";
import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  MoreOutlined,
  CloseOutlined
} from "@ant-design/icons";
import "./Components.css";

const Sidebar = ({ popUp, setPopUp1 }) => {
  const [showdrop1, setShowdrop1] = useState(false);
  const [showdrop2, setShowdrop2] = useState(false);
  const [showdrop3, setShowdrop3] = useState(false);

  // ✅ Load state from localStorage only on mount
  useEffect(() => {
    setShowdrop1(JSON.parse(localStorage.getItem("showdrop1")) || false);
    setShowdrop2(JSON.parse(localStorage.getItem("showdrop2")) || false);
    setShowdrop3(JSON.parse(localStorage.getItem("showdrop3")) || false);
  }, []);

  // ✅ Save individual state changes
  useEffect(() => {
    localStorage.setItem("showdrop1", JSON.stringify(showdrop1));
  }, [showdrop1]);

  useEffect(() => {
    localStorage.setItem("showdrop2", JSON.stringify(showdrop2));
  }, [showdrop2]);

  useEffect(() => {
    localStorage.setItem("showdrop3", JSON.stringify(showdrop3));
  }, [showdrop3]);

  // ✅ Close sidebar and reset dropdowns
  const closeSidebar = () => {
    setPopUp1(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Clear dropdown states
    localStorage.removeItem("showdrop1");
    localStorage.removeItem("showdrop2");
    localStorage.removeItem("showdrop3");

    setShowdrop1(false);
    setShowdrop2(false);
    setShowdrop3(false);
  };


  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth); // Update state with new width
      if (window.innerWidth > 566) {
        setPopUp1(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {popUp && (
        <Drawer
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="text-xl font-semibold"><SvgIcon /></span>
              
              <Button icon={<CloseOutlined />} className="close-btn" onClick={closeSidebar} />
            </div>
          }
          placement="left"
          closable={false}
          onClose={closeSidebar}
          visible={popUp}
          width="100%"
          className="fullscreen-drawer light-theme side"
        >
          <Menu theme="light" mode="inline" className="side_menu" style={{marginBottom:"25px"}}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink to="/" onClick={closeSidebar}>Home</NavLink>
            </Menu.Item>
 
            <Menu.SubMenu
              key="2"
              icon={<InfoCircleOutlined />}
              title={<NavLink to={"/About"} onClick={closeSidebar}>About</NavLink>}
              onTitleClick={() => setShowdrop1(prev => !prev)}
            >
              {showdrop1 && (
                <>
                  <Menu.Item key="2-1"><Link to="#">Vision</Link></Menu.Item>
                  <Menu.Item key="2-2"><Link to="#">Mission</Link></Menu.Item>
                </>
              )}
            </Menu.SubMenu>

            <Menu.SubMenu
              key="3"
              icon={<AppstoreOutlined />}
              title={<NavLink to={"/Services"} onClick={closeSidebar}>Services</NavLink>}
              onTitleClick={() => setShowdrop2(prev => !prev)}
            >
              {showdrop2 && (
                <>
                  <Menu.Item key="3-1"><Link to="/Services/AirFreight">Air Freight</Link></Menu.Item>
                  <Menu.Item key="3-2"><Link to="/Services/SeaFreight">Sea Freight</Link></Menu.Item>
                  <Menu.Item key="3-3"><Link to="/Services/Procurement">Procurement</Link></Menu.Item>
                  <Menu.Item key="3-4"><Link to="/Services/Door2door">Door to Door Delivery</Link></Menu.Item>
                </>
              )}
            </Menu.SubMenu>

            <Menu.Item key="4" icon={<PhoneOutlined rotate={90} />}>
              <NavLink to="/Contact" onClick={closeSidebar}>Contact us</NavLink>
            </Menu.Item>

            <Menu.SubMenu
              key="5"
              icon={<MoreOutlined />}
              title={<NavLink to={"/More"} onClick={closeSidebar}>More</NavLink>}
              onTitleClick={() => setShowdrop3(prev => !prev)}
            >
              {showdrop3 && (
                <>
                  <Menu.Item key="5  -1"><Link to="/More/FAQs">FAQs</Link></Menu.Item>
                  <Menu.Item key="5-2"><Link to="/More/Gallery">Gallery</Link></Menu.Item>
                  <Menu.Item key="5-3"><Link to="/More/Privacy">Privacy & Policy</Link></Menu.Item>
                </>
              )}
            </Menu.SubMenu>
          </Menu>

          {/* Footer */}
          <div className="sidebar_footer">
            © 2025 SF Ghana Logistics.
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;

