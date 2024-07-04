import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './NotificationsPage.css';
import axios from 'axios';

const socket = io('http://localhost:3000');  

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const loggedUser = JSON.parse(localStorage.getItem('userData'));
        const response = await axios.get(`http://localhost:3000/notifications/${loggedUser._id}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Errore nel recuperare le notifiche', error);
      }
    }; //recupero delle notifiche

    fetchNotifications();  //Ascolto degli eventi WebSocket
//Chiama la funzione per recuperare le notifiche quando il componente viene montato
    socket.on('notification', (data) => {
      const loggedUser = JSON.parse(localStorage.getItem('userData'));
      if (data.receiverId === loggedUser._id) {
        setNotifications((prevNotifications) => [...prevNotifications, data]);
        alert(`Nuova notifica: ${data.message}`);
      }
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  //Effetto per unirsi alla stanza delle notifiche
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('userData'));
    if (loggedUser) {
      socket.emit('join', loggedUser._id); //Unirsi alla stanza delle notifiche permette al server di sapere che l'utente è connesso e pronto a ricevere notifiche in tempo reale.
    }
  }, []);

  return (
    <div className="notifications-page">
      <h2>Centro Notifiche</h2>
      <div className="notifications-container">
        {notifications.length === 0 ? (
          <p>Nessuna notifica.</p>
        ) : (
          <ul className="notifications-list">
            {notifications.map((notification, index) => (
              <li key={index} className="notification-item">
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
