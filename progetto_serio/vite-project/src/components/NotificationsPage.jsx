import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './NotificationsPage.css';

const socket = io('http://localhost:3000');

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
      alert(`Nuova notifica: ${data.message}`);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.off('notification');
    };
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
                {notification}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
