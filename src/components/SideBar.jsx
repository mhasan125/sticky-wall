import React, { useState } from 'react'
import {
  BookOutlined, CalendarFilled, DoubleRightOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined,
  UserOutlined, WalletFilled,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, message, Popconfirm } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import StickyWall from '../pages/Frontend/StickyWall';
import AddNote from '../pages/Frontend/AddNote';
import Personal from '../pages/Frontend/Personal';
import Work from '../pages/Frontend/Work';
import UpdateNote from '../pages/Frontend/UpdateNote';
import Today from '../pages/Frontend/Today';
import Upcoming from '../pages/Frontend/Upcoming';
import Calander from '../pages/Frontend/Calander';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthContext } from '../Context/AuthContext';
const { Sider, Content } = Layout;
import { QuestionCircleOutlined } from '@ant-design/icons';


export default function SideBar() {
  const {dispatch,user}  = useAuthContext()
  const [collapsed, setCollapsed] = useState(false);
  // const {token: { colorBgContainer } = theme.useToken();
  const handleSignOut = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      // Sign-out successful.
      message.success("Sign Out")
      dispatch({ type: "SET_LOGGED_OUT" })
    }).catch((error) => {
      // An error happened.
      console.log(error)
      message.error("Can not do Sign out")
    })
  }
  
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <b className='ms-2' style={{ color: 'white', paddingTop: '5px' }}>Menu</b>
            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)} style={{ fontSize: '16px', width: 64, height: 64, }} />
          </div>
          <Menu theme="dark" mode="inline" 
          // defaultSelectedKeys={['1']}
            items={[
              {
                key: '4',
                icon: <DoubleRightOutlined />,
                label: <Link to="/upcoming">Up Coming</Link>,

              },
              {
                key: '2',
                icon: <UnorderedListOutlined />,
                label: <Link to="/today">Today</Link>,
              },
              {
                key: '3',
                icon: <CalendarFilled />,
                label: <Link to="/calender">Calender</Link>,
              },
              {
                key: '1',
                icon: <WalletFilled />,
                label: <Link to="/">Sticky Wall</Link>,
              },
              {
                key: '5',
                icon: <UserOutlined />,
                label: <Link to="/personal">Personal</Link>,
              },
              {
                key: '6',
                icon: <BookOutlined />,
                label: <Link to="/work">Work</Link>,
              },
              {
                key: '7',
                icon: <LogoutOutlined  />,
                label: <p className='m-0' onClick={handleSignOut}>Sign Out</p>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content>
            <Routes>
              <Route path='/upcoming' element={<Upcoming />} />
              <Route path='/today' element={<Today />} />
              <Route path='/calender' element={<Calander />} />
              <Route path='/' element={<StickyWall />} />
              <Route path='/personal' element={<Personal />} />
              <Route path='/work' element={<Work />} />


              <Route path='/addNote' element={<AddNote />} />
              <Route path='/addNote/:id' element={<UpdateNote />} />
              <Route path="*" element={<h1 className='text-center text-danger'>404 Page Not Found!</h1>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
