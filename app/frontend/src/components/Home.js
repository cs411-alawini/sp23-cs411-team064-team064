import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Heading, Container, Stack, Input } from '@chakra-ui/react'

import axios from "axios";

const Home = () => {

    // page navigation to Advanced Queries page
    let navigate = useNavigate();
    const navigateToAdv = () => {
        navigate('advQueries');
    }

    // page navigation to Recommendations page
    const navigateToRec = () => {
        navigate('/recommendations', {state: {origin: origin,
                                    destination: destination,
                                    month: month}});
    }

    // handle submit should insert new customer info into database
    const handleSubmit = event => {
        console.log('submitted form');
        event.preventDefault();  // prevent page refresh
    }

    // retrieve adv query 1
    const [num, setnum] = useState("0");
    useEffect(() => {
        axios.get('http://localhost:3002/').then((response) => {
            setnum(response.data[0].cCount)
            // console.log(response.data[0].ccount);
        })
    }, [])

    // variables for form below
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [month, setMonth] = useState('');

  return (
    <div>
        <div>
            <Heading>
            Flight Recommendations
            </Heading>
            Num flightIds: {num} <br /> 
            <Button onClick={navigateToAdv}>
                Click for advanced queries
            </Button> 
        </div>


        <div>
        <Container>
            <br/>
            <Heading>
                Enter Flight Info:
            </Heading>
            <br/>
            <form onSubmit={handleSubmit}>

            <Stack spacing={3}>

                <Input
                placeholder='Enter Origin Airport (ex: SFO)'
                id="origin_"
                name="origin_"
                type="text"
                onChange={event => setOrigin(event.target.value)}
                value={origin}
                size='md'
                />

                <Input
                placeholder='Enter Destination Airport (ex: ORD)'
                id="destination_"
                name="destination_"
                type="text"
                onChange={event => setDestination(event.target.value)}
                value={destination}
                size='md'
                />

                <Input
                placeholder='Enter Travel Month (Numerical, ex: 2):'
                id="month_"
                name="month_"
                type="int"
                onChange={event => setMonth(event.target.value)}
                value={month}
                />

            </Stack>
            
            {/* <br />
            <Button type="submit">Submit</Button> <br />
            <br /> */}
            <Button type="submit" onClick={navigateToRec}>
                Click for Recommendations!
            </Button> 

        </form>
        </Container>
    </div>
    </div>
  )
}

export default Home