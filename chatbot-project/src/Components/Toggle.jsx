import './Toggle.css';

export function Toggle({ inputPosition, setInputPosition }) {
  function toggleChat() {
    if (inputPosition === 'above') {
      setInputPosition('below');
    } else {
      setInputPosition('above');
    }
  }
  return (
    <div className='toggle-container'>
      <a className='toggle-button' onClick={toggleChat}>
        Move textbox to {inputPosition === 'above' ? 'bottom' : 'top'}
      </a>
    </div>
  );
}