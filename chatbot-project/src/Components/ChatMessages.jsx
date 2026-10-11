import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function useAutoScroll(dependencies) {
  const chatMessageRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessageRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return chatMessageRef;
}


export function ChatMessages({ chatMessages, inputPosition }) {

  const chatMessageRef = useAutoScroll(chatMessages);


  return (
    <div className='chat-message-container' ref={chatMessageRef}>

      {chatMessages.length > 0 ? (chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
            isLoading={chatMessage.isLoading}
          />
        );
      })) : <p className="empty-conversation"> Welcome to chatbot project! Send a message in textbox {inputPosition}</p>
      }
    </div>
  );
}
