// calculate recommendations
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Button, Heading, Stack } from '@chakra-ui/react'

import axios from "axios";

const Recommendations = () => {

// navigate home
let navigate = useNavigate();
const navigateHome = () => {
    navigate('/');
}

// get data from Home Page
const location = useLocation();
const originAirport = location.state.origin;
const destinationAirport = location.state.destination;
const month_ = location.state.month;

const [avgDelays, setAvgDelays] = useState([]);
useEffect(() => {
    axios.get('http://localhost:3002/api/airlines-most-delayed', {
        params: {
            Origin: originAirport,
            Destination: destinationAirport,
            Month: month_
        }
    }).then((response) => {
        setAvgDelays(response.data);
        console.log("potentialFlights", response.data);
    }).catch((error) => {
        console.error(error);
    });
}, []);



return (
    <div>
        <Stack spacing={3}>
            <div>
                <Heading>
                    Your Recommendations:
                </Heading>
                Travel Details: <br/>
                Origin: {originAirport} <br/>
                Destination: {destinationAirport} <br/>
                Month: {month_} <br/>
            </div>
            <div>
                Worst Airlines based on Travel Details: <br/>
                Airline, Average Delay Time<br/>
                {avgDelays.map(data => (
                    <p> {data.Airline} {data.avgDelay}</p>
                ))}
            </div>


            <Button onClick={navigateHome}>
                Try another flight
            </Button>

        </Stack>
    </div>
  )
}

export default Recommendations