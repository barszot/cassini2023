import React from 'react';
function PyButton() {
  const handleClick = () => {
    alert('Przycisk został kliknięty');
  };

  return (
    <div>
      <button onClick={handleClick}>Kliknij mnie!</button>
    </div>
  );
}

export default PyButton;