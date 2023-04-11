import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

import { Button, Heading, Container, Stack, Input, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'

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


    // For month dropdown menu
    const handleOptionClick = event => {
        const selectedOption = event.target.value;
        setMonth(selectedOption);
      };
    const options = [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
      ];

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

                <Menu>
                    <MenuButton as={Button}>{month || "Select Month"}</MenuButton>
                    <MenuList>
                        {options.map(option => (
                        <MenuItem key={option.value} value={option.value} onClick={handleOptionClick}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </MenuList>
                </Menu>

            </Stack>
            
            <Button className='submit-button' type="submit" onClick={navigateToRec}>
                Click for Recommendations!
            </Button> 

        </form>
        </Container>
    </div>
    </div>
  )
}

export default Home