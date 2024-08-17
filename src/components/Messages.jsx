import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// Assets
import person from '../assets/person.svg';
import send from '../assets/send.svg';

// Socket
const socket = io('ws://localhost:3030');

const Messages = ({ account, messages, currentChannel }) => {
  const messageEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const sendMessage = (event) => {
    event.preventDefault();
    const messageObj = {
      channel: currentChannel.id.toString(),
      account: account,
      text: message,
    };
    if (message !== '') {
      socket.emit('new message', messageObj);
      setMessage('');
    }
  };
  const scrollHandler = () => {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };
  return (
    <div className="text">
      <div className="messages">
        {currentChannel &&
          messages
            .filter(
              (message) => message.channel === currentChannel.id.toString()
            )
            .map((message, index) => (
              <div className="message" key={index}>
                <img src={person} alt="Person" />
                <div className="message-content">
                  <h3>
                    {message.account.slice(0, 6) +
                      '...' +
                      message.account.slice(-4)}
                  </h3>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        {currentChannel && account ? (
          <input
            type="text"
            value={message}
            placeholder={`Message ##${currentChannel.name}`}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : (
          <input
            type="text"
            value=""
            placeholder="Please Connect on Metamask and Join channel"
            disabled
          />
        )}

        <button type="submit">
          <img src={send} alt="Send Message" />
        </button>
      </form>
    </div>
  );
};

export default Messages;
