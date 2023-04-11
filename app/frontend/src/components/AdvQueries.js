import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading } from '@chakra-ui/react'


import axios from "axios";

const AdvQueries = () => {
    

    // retrieve adv query 1
    const [aaDelay, setaaDelay] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/api/delay-10').then((response) => {
            setaaDelay(response.data)
            console.log(response.data);
        })
    }, []);

    // retrieve adv query 2
    const [canclledDFW, setacanclledDFW] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002//api/cancelledDFW-SFO').then((response) => {
            setacanclledDFW(response.data)
            console.log(response.data);
        })
    }, []);

    return (
        <div>
            <div>
              Number of AA Flights Delayed over 10 minutes, by month: <br /> 
              <div>
                  {aaDelay.map(data => (
                      <p> {data.Month}:  {data.cCount} </p>
                  ))}
              </div>
            </div>

            {/* FIX THIS ONE (not displaying data for some reason) */}
            <div>
              Number of Flights Cancelled from SFO to DFW by Airline: <br /> 
              <div>
                  {canclledDFW.map(data => (
                      <p> {data.Airline}:  {data.cCount} </p>
                  ))}
              </div>
            </div>

        </div>
      )
}

export default AdvQueries
