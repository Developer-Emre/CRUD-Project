'use client'
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { Modal } from 'flowbite-react';
import axios from 'axios';

export default function Home() {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editedEvent, setEditedEvent] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData();
    }, [modalIsOpen, deleteId]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get', {
                params: {
                    items: 'all'
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`);
            setDeleteId(id);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleUpdateClick = (event) => {
        setEditedEvent(event);
        setModalIsOpen(true);
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/update/${editedEvent.id}`, editedEvent);
            setEditedEvent(null);
            setModalIsOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <div className="event-page">
            <Navbar />
            <div className="all-event container mx-auto bg-white">
                <div className="event-header">
                    <h1 className='text-xl font-bold p-5'>Event Management</h1>
                </div>
                {events.map((event, index) => (
                    <div className='flex justify-between event' key={index}>
                        {Object.keys(event).map((key) => (
                            key !== 'id' && (
                                <div key={key}>
                                    <h2 className='text-md font-bold p-5'>{key}</h2>
                                    <h2 className=' p-5'>{event[key]}</h2>
                                </div>
                            )
                        ))}
                        <div className='flex items-center'>
                            <div className='update-btn'>
                                <button className='bg-blue-600 text-white p-2 gap-4' onClick={() => handleUpdateClick(event)}>Update</button>
                            </div>
                            <div className='delete-btn p-5'>
                                <button className='bg-red-600 text-white p-2' onClick={() => handleDelete(event.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                <Modal show={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <Modal.Header>Edit Event</Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(editedEvent);
                        }}>
                            {editedEvent && Object.keys(editedEvent).map((key) => (
                                key !== 'id' && (
                                    <div key={key} className="mb-4">
                                        <label htmlFor={key} className="block text-md font-bold mb-2">{key}</label>
                                        <input type={key === 'date' ? 'date' : 'text'} id={key} name={key} value={editedEvent[key] || ''} onChange={(e) => setEditedEvent({ ...editedEvent, [key]: e.target.value })} className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-300" />
                                    </div>
                                )
                            ))}
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-blue-800">Save Changes</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
