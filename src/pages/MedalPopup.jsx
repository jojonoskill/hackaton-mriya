import React, { useState } from 'react';
import './Popup.css'; // Create a CSS file for styling

function Popup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (event) => {
    console.error(event.target.checked);
    if (event.target.checked) {
      setIsPopupOpen(true);
    }
  };
  
  const closePopup = (event) => {
    setIsPopupOpen(false);
  }

  return (
    <div>
      <input type="checkbox" onChange={openPopup}></input>
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <span role="img" aria-label="medal" className="medal-icon">🏅</span>
            <p>Congratulations! You've won a medal!</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
