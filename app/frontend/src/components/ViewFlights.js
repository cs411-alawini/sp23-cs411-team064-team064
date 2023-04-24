import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

import { Button, Center, Heading, Container, Stack, Input, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'

import axios from "axios";

const ViewFlights = () => {

    // page navigation to Advanced Queries page
    // navigate home
    let navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    }

  return (
    <div>
        <Button className='add-data-back-button' onClick={navigateHome}>
            back
        </Button>
    </div>
  )
}

export default ViewFlights