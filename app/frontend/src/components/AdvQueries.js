import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Heading } from '@chakra-ui/react'


import axios from "axios";

const AdvQueries = () => {
    

    // retrieve adv query 1
    const [aaDelay, setaaDelay] = useState("0");
    useEffect(() => {
        axios.get('http://localhost:3002/api/delay-10').then((response) => {
            setaaDelay(response.data)
            // console.log(response.data[0].ccount);
        })
    }, [])

    return (
        <div>
            <div>
              Number of AA Flights Delayed over 10 minutes, by month: <br /> 
              <div>
                  {aaDelay.map(data => (
                      <p> {data.cCount} </p>
                  ))}
              </div>
          </div>
        </div>
      )
}

export default AdvQueries
