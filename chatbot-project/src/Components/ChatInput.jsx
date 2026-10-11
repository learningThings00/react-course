import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import './ChatInput.css';

export function ChatInput({ setChatMessages }) {
  const [inputText, setInputText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (!inputText.trim()) {
      return;
    }

    if (isLoading) {
      return;
    }


    setChatMessages(prev => [...prev, {
      message: inputText,
      sender: 'user',
      id: crypto.randomUUID(),
      time: dayjs().valueOf(),
      isLoading: isLoading
    }]);

    setIsLoading(true);

    setChatMessages(prev => [
      ...prev,
      {
        message: '',
        sender: 'robot',
        id: 'temp1',
        isLoading: true
      }
    ]);

    setInputText('');

    try {
      const response = await Chatbot.getResponseAsync(inputText);

      setChatMessages(prev => [
        ...prev.filter(msg => msg.id !== 'temp1'),
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf(),
          isLoading: isLoading
        }
      ]);
    } catch (error) {
      console.log(error);

      setChatMessages(prev => [
        ...prev.filter(msg => msg.id !== 'temp1'),
        {
          message: 'Something went wrong. Please try again.',
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf(),
          isLoading: isLoading
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function keyDownMenu(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }

    if (event.key === 'Escape') {
      setInputText('');
    }
  }

  function resetChat() {
    localStorage.setItem('messages', JSON.stringify([]));
    setChatMessages([]);
  }

  return (
    <div className='input-container'>
      <input
        placeholder='Send a message to Chatbot'
        size='30'
        onChange={saveInputText}
        onKeyDown={keyDownMenu}
        value={inputText}
        className='input-message'
      />
      <button onClick={sendMessage} className='send-message'>
        Send
      </button>
      <button onClick={resetChat} className='reset-chat'>Clear</button>
    </div>
  );
}