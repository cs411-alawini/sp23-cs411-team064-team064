import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

import { Button, Center, Heading, Container, Stack, Input, Menu, MenuButton, MenuList, MenuItem, Text, FormControl } from '@chakra-ui/react'

import axios from "axios";

const Home = () => {

    // page navigation to Advanced Queries page
    let navigate = useNavigate();
    const navigateToAdv = () => {
        navigate('advQueries');
    }

    // page navigation to Advanced Queries page
    const navigateToAddData = () => {
        navigate('addData');
    }

    function validateFields() {
        let isValid = true;
        if (!origin || !destination || !month) {
            isValid = false;
        }
        return isValid;
      }

    // for displaying verification msg after submit button clicked
    const [message, setMessage] = useState(null);
    // page navigation to Recommendations page
    const navigateToRec = () => {
        if (!validateFields()) {
            setMessage("One or more required fields are missing.");
        } else {
        navigate('/recommendations', {state: {origin: origin,
                                    destination: destination,
                                    month: month}});
        }
    }

    // page navigation to Update Name page
    const navigateToUpName = () => {
        navigate('updateName');
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
            <Center className="title">
                <Heading>
                Flight Recommendations
                </Heading>
            </Center>
            <Center>
                Number of Flights in Database: {num} <br /> 
            </Center>
            <Container className='button-container'>            
                <Button onClick={navigateToAdv}>
                    Click for advanced queries
                </Button> 

                <Button className='contribute-button' onClick={navigateToAddData}>
                    Contribute to Database
                </Button> 

                <Button className='update-name-button' onClick={navigateToUpName}>
                    Update Personal Info
                </Button> 
            </Container>
            
            
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

                    <FormControl isRequired>
                    <Input
                    placeholder='Origin Airport (ex: SFO)'
                    id="origin_"
                    name="origin_"
                    type="text"
                    onChange={event => setOrigin(event.target.value)}
                    value={origin}
                    size='md'
                    />
                    </FormControl>

                    <FormControl isRequired>
                    <Input
                    placeholder='Destination Airport (ex: ORD)'
                    id="destination_"
                    name="destination_"
                    type="text"
                    onChange={event => setDestination(event.target.value)}
                    value={destination}
                    size='md'
                    />
                    </FormControl>

                    <FormControl isRequired>
                    <Menu>
                        <MenuButton as={Button}>{month || "Select Month"}</MenuButton>
                        <MenuList>
                            {options.map(option => (
                            <MenuItem key={option.value} value={option.label} onClick={handleOptionClick}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    </FormControl>

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