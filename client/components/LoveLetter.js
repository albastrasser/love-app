import React, { useState } from 'react';
import axios from 'axios';

export default function LoveLetter() {
  const [loveLetters, setLoveLetters] = useState([]);
  const [counter, setCounter] = useState(0);

  function navigate(event) {
    if (event.target.name === 'next') {
      if (counter === 9) setCounter(0);
      else setCounter(counter + 1);
    } else {
      if (counter === 0) setCounter(9);
      else setCounter(counter - 1);
    }
  }
  async function handleClick() {
    let { data } = await axios.post(
      'https://rosalove-emekaborisama.cloud.okteto.net/loveletterlong'
    );
    setLoveLetters(data.result);
  }
  return (
    <div>
      <h1>Need a Love Letter?</h1>
      <button onClick={handleClick}>Press this for 10 Love Letters</button>
      {loveLetters.length !== 0 && (
        <div>
          <p>{loveLetters[counter]}</p>
          <button name="back" onClick={navigate}>
            Back
          </button>
          <button name="next" onClick={navigate}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
