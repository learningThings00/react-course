import { useState, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import { ChatInput } from './Components/ChatInput';
import { ChatMessages } from './Components/ChatMessages';
import { Toggle } from './Components/Toggle';
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('messages')) || [];
    return saved.map(msg => msg.isLoading ? {
      ...msg,
      message: 'Sorry, the reply was interrupted. Please send your message again.',
      id: crypto.randomUUID(),
      time: dayjs().valueOf(),
      isLoading: false,
    } : msg)
  });

  const [inputPosition, setInputPosition] = useState('above');

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages])

  useEffect(() => {
    Chatbot.addResponses({
      'how old are you': 'I am just few days old.',
      'what is the time': () => {
        return `The time is ${dayjs().format('h:mm a')}.`
      },
      'can you boil an egg': "First take eggs and put them in water. then put them on stove for 8-12 minutes. And done you have boiled eggs."
    })
  }, [])

  return (
    <div className='app-container'>
      {inputPosition === 'above' ? (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      ) : (
        <Toggle
          inputPosition={inputPosition}
          setInputPosition={setInputPosition}
        />
      )}
      <ChatMessages chatMessages={chatMessages} inputPosition={inputPosition} />
      {inputPosition === 'below' ? (
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      ) : (
        <Toggle
          inputPosition={inputPosition}
          setInputPosition={setInputPosition}
        />
      )}
    </div>
  );
}

export default App
