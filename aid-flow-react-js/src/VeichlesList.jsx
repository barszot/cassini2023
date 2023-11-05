import React from 'react';

function VeichlesList({ text }) {
  // Podziel łańcuch znaków na kawałki za pomocą "@" jako separatora
  const elementy = text.split('@');
  elementy.pop();
  // Utwórz listę elementów JSX z obramowaniem
  const listaElementow = elementy.map((element, index) => {
    // Sprawdź, czy element zawiera "Not available"
    const czyNotAvailable = element.includes("Not available");
    // Ustal kolor obramowania w zależności od wyniku warunku
    const bgColor = czyNotAvailable ? '#FF6666' : 'lightgreen';

    return (
      <div key={index} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' ,
      backgroundColor: `${bgColor}`}}>
        {element}
      </div>
    );
  });

  return (
    <div>
      {listaElementow}
    </div>
  );
}

export default VeichlesList;
