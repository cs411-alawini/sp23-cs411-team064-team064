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
    axios.get('http://localhost:3002/api/airlines-least-delayed', {
        params: {
            Origin: originAirport,
            Destination: destinationAirport,
            Month: month_
        }
    }).then((response) => {
        setAvgDelays(response.data);
        console.log("delayed airlines", response.data);
    }).catch((error) => {
        console.error(error);
    });
}, []);


const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const months = Array.from({ length: 13 }, (_, index) => index + 1).map((month) => {
return monthNames[month - 2];
});

return (
    <div>
        <Stack spacing={3}>
            <div>
                <Heading>
                    Your Recommendations:
                </Heading>
                Origin: {originAirport} <br/>
                Destination: {destinationAirport} <br/>
                Month: {months[month_]} <br/>
            </div>
            <div>
                Best Airlines based on Travel Details: <br/>
                Airline, Average Delay Time (Minutes) <br/>
                {avgDelays.map(data => (
                    <p> {data.Airline} {Math.round(data.avgDelay * 100) / 100}</p>
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