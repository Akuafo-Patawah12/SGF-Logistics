import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Layout, Menu, Button,Drawer } from "antd";
import { ReactComponent as SvgIcon } from "../Icons/svgl_svg_format_2.svg"
import {
  HomeOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  MoreOutlined,
  DownOutlined,
  CloseOutlined
} from "@ant-design/icons";
import "./Components.css";



const Sidebar = ({ popUp, setPopUp1, popRef }) => {
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);

  const closeSidebar = () => {
    setPopUp1(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {popUp && (
        <Drawer
  title={
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span className="text-xl font-semibold"><SvgIcon /></span>
      <Button
        icon={<CloseOutlined />}
        className="close-btn"
        onClick={() => setPopUp1(false)}
      />
    </div>
  }
  placement="left"
  closable={false}
  onClose={() => setPopUp1(false)}
  visible={popUp}
  width="100%"
  className="fullscreen-drawer light-theme"
>
  <Menu theme="light" mode="inline" className="side_menu">
    <Menu.Item key="1" icon={<HomeOutlined />}>
      <NavLink to="/" onClick={closeSidebar}>
        Home
      </NavLink>
    </Menu.Item>

    <Menu.SubMenu
      key="2"
      icon={<InfoCircleOutlined />}
      title="About"
      onTitleClick={() => setShow1(!show1)}
    >
      {show1 && (
        <>
          <Menu.Item key="2-1">
            <Link to="#">Vision</Link>
          </Menu.Item>
          <Menu.Item key="2-2">
            <Link to="#">Mission</Link>
          </Menu.Item>
        </>
      )}
    </Menu.SubMenu>

    <Menu.SubMenu
      key="3"
      icon={<AppstoreOutlined />}
      title="Services"
      onTitleClick={() => setShow2(!show2)}
    >
      {show2 && (
        <>
          <Menu.Item key="3-1">
            <Link to="/Services/AirFreight">Air Freight</Link>
          </Menu.Item>
          <Menu.Item key="3-2">
            <Link to="/Services/SeaFreight">Sea Freight</Link>
          </Menu.Item>
          <Menu.Item key="3-3">
            <Link to="/Services/Procurement">Procurement</Link>
          </Menu.Item>
          <Menu.Item key="3-4">
            <Link to="/Services/Door2door">Door to Door Delivery</Link>
          </Menu.Item>
        </>
      )}
    </Menu.SubMenu>

    <Menu.Item key="4" icon={<PhoneOutlined rotate={90} />}>
      <NavLink to="/Contact_us" onClick={closeSidebar}>
        Contact
      </NavLink>
    </Menu.Item>

    <Menu.SubMenu
      key="5"
      icon={<MoreOutlined />}
      title="More"
      onTitleClick={() => setShow3(!show3)}
    >
      {show3 && (
        <>
          <Menu.Item key="5-1">
            <Link to="/More/FAQs">FAQs</Link>
          </Menu.Item>
          <Menu.Item key="5-2">
            <Link to="/More/Gallery">Gallery</Link>
          </Menu.Item>
          <Menu.Item key="5-3">
            <Link to="/More/Privacy">Privacy & Policy</Link>
          </Menu.Item>
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
