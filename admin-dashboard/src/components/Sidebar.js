import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  TeamOutlined,
  DollarOutlined,
  WarningOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />}>
          <Link to="/residents">Resident Management</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DollarOutlined />}>
          <Link to="/payments">Payment Management</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<WarningOutlined />}>
          <Link to="/complaints">Complaint Management</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CalendarOutlined />}>
          <Link to="/events">Event Management</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;

