import React, { useState } from 'react';
import axios from 'axios';

export default function Zodiac() {
  const [zodiac1, setZodiac1] = useState('aries');
  const [zodiac2, setZodiac2] = useState('aries');
  const [result, setResult] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    let { data } = await axios.get(
      `https://devbrewer-horoscope.p.rapidapi.com/match/${zodiac1}/${zodiac2}`,
      {
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_ZODIACLOVEKEY,
          'x-rapidapi-host': 'devbrewer-horoscope.p.rapidapi.com',
        },
      }
    );
    let zodiacMatch = data.Result.split('.').slice(0,4).join('. ')
    setResult(zodiacMatch + '!')
  }
  return (
    <div className="heart-shape">
      <h1>Okay but are your Zodiac signs compatible???</h1><br/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="zodiac1"> First Person's Zodiac Sign</label><br/>
        <select
          name="zodiac1"
          onChange={(event) => setZodiac1(event.target.value)}
          id='input'>
          <option value="aries">Aries</option>
          <option value="taurus">Taurus</option>
          <option value="gemini">Gemini</option>
          <option value="cancer">Cancer</option>
          <option value="leo">Leo</option>
          <option value="virgo">Virgo</option>
          <option value="libra">Libra</option>
          <option value="scorpio">Scorpio</option>
          <option value="capricorn">Capricorn</option>
          <option value="aquarius">Aquarius</option>
          <option value="pisces">Pisces</option>
        </select><br/>
        <label htmlFor="zodiac2"> Second Person's Zodiac Sign</label><br/>
        <select
          name="zodiac2"
          onChange={(event) => setZodiac2(event.target.value)}
          id='input'>
          <option value="aries">Aries</option>
          <option value="taurus">Taurus</option>
          <option value="gemini">Gemini</option>
          <option value="cancer">Cancer</option>
          <option value="leo">Leo</option>
          <option value="virgo">Virgo</option>
          <option value="libra">Libra</option>
          <option value="scorpio">Scorpio</option>
          <option value="capricorn">Capricorn</option>
          <option value="aquarius">Aquarius</option>
          <option value="pisces">Pisces</option>
        </select><br/><br/>
        <button type="submit" className='submit'>Worth a shot...</button>
      </form>
      <div id='zodres'>{result ? result : null}</div>
    </div>
  );
}
