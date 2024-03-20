'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'flowbite-react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const CalendarComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    category: '',
    description: '',
    time: '',
  });
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');

  const calendarRef = useRef(null);
  let calendar;

  useEffect(() => {
    calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: events,
      editable: true,
      selectable: true,
      select: handleDateSelect,
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [events]);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setModalIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateOnly = selectedDate.split('T')[0];
      const eventData = {
        eventName: eventDetails.eventName,
        category: eventDetails.category,
        description: eventDetails.description,
        time: eventDetails.time,
        date: dateOnly,
      };

      await axios.post('http://127.0.0.1:8000/api/create', eventData);
      setEvents([...events, eventData]);
      setModalIsOpen(false);
      setEventDetails({
        eventName: '',
        category: '',
        description: '',
        time: '',
      });
      setMessage('Event successfully added!');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage('An error occurred while adding the event!');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {message && (
        <Alert color="info">
          <span className="event-message text-center justify-center"></span>
          {message}
        </Alert>
      )}
      <div className='flex'>
        <div ref={calendarRef} />
        {modalIsOpen && (
          <div className="modal mx-auto border-2 shadow-xl p-5 rounded-lg">
            <div className="modal-content">
              <span className="close cursor-pointer" onClick={closeModal}>&times;</span>
              <div className='p-5'>
                <h1 className='text-xl'>Add New Event</h1>
              </div>
              <h2 className='text-sm font-medium'>Event Date - {selectedDate}</h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div className='flex gap-4'>
                  <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6">Event Name:</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      value={eventDetails.eventName}
                      onChange={(e)=>setEventDetails({...eventDetails, eventName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-6">Event Category:</label>
                    <input type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      value={eventDetails.category}
                      onChange={(e)=>setEventDetails({...eventDetails, category: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                  <input type="text" name="description" id="description" className="w-50 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                    value={eventDetails.description}
                    onChange={(e)=>setEventDetails({...eventDetails, description: e.target.value})}
                  />
                  <div>
                    <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time:</label>
                    <input type="time" name="time" id="time" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      value={eventDetails.time}
                      onChange={(e)=>setEventDetails({...eventDetails, time: e.target.value})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800">Add</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
