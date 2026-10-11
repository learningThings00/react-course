import dayjs from 'dayjs';
import RobotImage from '../assets/robot.png';
import UserImage from '../assets/user.png';
import LoadingGif from '../assets/loading-spinner.gif';
import './ChatMessage.css';

export function ChatMessage({ message, sender, time, isLoading }) {

  return (
    <div
      className={
        sender === 'user' ? 'chat-message-user' : 'chat-message-robot'
      }
    >
      {sender === 'robot' && (
        <img src={RobotImage} className='sender-profile' />
      )}
      <div className='chat-message'>{isLoading ? <img className="loading-image" src={LoadingGif} /> : message} <div className='chat-time'>{time && dayjs(time).format('h:mma')}</div></div>
      {sender === 'user' && (
        <img src={UserImage} className='sender-profile' />
      )}
    </div>
  );
}