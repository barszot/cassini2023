import React from 'react';
function PyButton(props) {

  const {handleClick} = props


  return (
    <div className='gap'>
      <button  class="wielki-przycisk" onClick={handleClick}>Check veichles</button>
    </div>
  );
}

export default PyButton;