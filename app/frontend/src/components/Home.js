import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Heading } from '@chakra-ui/react'

import axios from "axios";

const Home = () => {
    // page navigation to user input page
    let navigate = useNavigate();
    const navigateToAdv = () => {
        navigate('advQueries');
    }

    // retrieve adv query 1
    const [num, setnum] = useState("0");
    useEffect(() => {
        axios.get('http://localhost:3002/').then((response) => {
            setnum(response.data[0].cCount)
            // console.log(response.data[0].ccount);
        })
    }, [])
    
  return (
    <div>
        <div>
            <Heading>
            Flight Recommendations
            </Heading>
            Current user count: {num} <br /> 
            <Button onClick={navigateToAdv}>
                Click for advanced queries
            </Button> 
        </div>
        <div>

        </div>
    </div>
  )
}

export default Home