import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Center, Heading, Container, Stack, Input, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import '../App.css'

import axios from "axios";

const AddData = () => {
    // variables for this page
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [airline, setAirline] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [month, setMonth] = useState('');
    
    // navigate home
    let navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

    // handle submit should update flights
    const handleSubmit = event => {
        console.log('handleSubmit run');
        event.preventDefault();  // prevent page refresh

        axios.post('http://localhost:3002/api/add-data', {
            FirstName: firstName,
            LastName: lastName,
            Airline: airline,
            Origin: origin,
            Destination: destination,
            Month: month
        }).then(() => {
            alert(('success'))
        })   
    }

    // for displaying verification msg after submit button clicked
    const [message, setMessage] = useState(null);
    const handleClick = () => {
        setMessage("Information updated for flight from " + origin + " to " + destination);
    };

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
            <Container>
                <br/>
                <Heading>
                    Name and Flight Details:
                </Heading>
                <br/>
                <form onSubmit={handleSubmit}>

                    <Stack spacing={3}>

                        <Input
                        placeholder='First Name'
                        id="first_name_"
                        name="first_name_"
                        type="text"
                        onChange={event => setFirstName(event.target.value)}
                        value={firstName}
                        size='md'
                        />

                        <Input
                        placeholder='Last Name'
                        id="last_name_"
                        name="last_name_"
                        type="text"
                        onChange={event => setLastName(event.target.value)}
                        value={lastName}
                        size='md'
                        />

                        <Input
                        placeholder='Airline ID (ex: AA)'
                        id="airline_"
                        name="airline_"
                        type="text"
                        onChange={event => setAirline(event.target.value)}
                        value={airline}
                        size='md'
                        />

                        <Input
                        placeholder='Origin Airport (ex: SFO)'
                        id="origin_"
                        name="origin_"
                        type="text"
                        onChange={event => setOrigin(event.target.value)}
                        value={origin}
                        size='md'
                        />

                        <Input
                        placeholder='Destination Airport (ex: ORD)'
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
                    <Button type="submit" className='add-data-submit-button' onClick={handleClick}>Submit</Button> <br />
                    {message && <p>{message}</p>}
            </form>
            </Container>

            <br />
            

            <Button className='add-data-back-button' onClick={navigateHome}>
                back
            </Button>


        </div>
      )
}

export default AddData