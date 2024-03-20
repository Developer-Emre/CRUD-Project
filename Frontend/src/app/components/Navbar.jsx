'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import axios from 'axios';

import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsCalendar2Event } from "react-icons/bs";

const NavbarComponent = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/upcomingEvent');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();

  return (
    <div>
      <Navbar className='bg-blue-700 rounded-none' fluid rounded>
        <Navbar.Brand as={Link} href='https://developer-emre.github.io/'>
          <span className='self-center text-white whitespace-nowrap text-2xl font-semibold dark:text-white'>Welcome to myApp</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className='flex items-center text-white'>
            <AiOutlineDashboard size={25} />
            <Navbar.Link className='navbar-item text-white text-xl' as={Link} href="/">
              Dashboard
            </Navbar.Link>
          </div>
          <div className='flex items-center text-white'>
            <BsCalendar2Event size={20} />
            <Navbar.Link className='navbar-item text-white text-xl' href='allevent/'>All Events</Navbar.Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <div className='calendar-header bg-white flex justify-between'>
        <div className='flex p-5 items-center'>
          <FaCalendarAlt size={25} />
          <h1 className='navbar-item text-2xl text-bold'>Calendar</h1>
        </div>
        <div className='flex p-5 items-center'>
          <IoMdNotificationsOutline size={30} />
          <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span>Notifications</span>}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
  