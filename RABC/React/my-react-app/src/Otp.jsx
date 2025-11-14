import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Otp = () => {
  const [phoneNumber, setphoneNumber] = useState();

  function loginFun(e) {
    const { name, value } = e.target;
    setphoneNumber(e.target.value);
  }

  async function done() {
    try {
      console.log("DATA GOING TO BACKEND:", phoneNumber);

      const res = await axios.post("http://localhost:4000/send-otp", phoneNumber, {
      });

      console.log("SERVER RESPONSE →", res.data);

    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  return (
    <div>
      <fieldset>  
        <input
          type='number'
          onChange={loginFun}
          name='phoneNumber'
          value={phoneNumber}
          placeholder='Enter your number'
        />

        <br/><br/>



        <button onClick={done}>login</button>
      </fieldset>

  
    </div>
  )
}

export default Otp;