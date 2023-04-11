import './App.css';
import {Route, Routes} from 'react-router-dom';

import Home from './components/Home';
import AdvQueries from './components/AdvQueries';
import Recommendations from './components/Recommendations';

import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/advQueries" element={<AdvQueries />}></Route>
        <Route path="/recommendations" element={<Recommendations />}></Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
