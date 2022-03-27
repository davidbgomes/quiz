import '../styles/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Game from '../pages/game';
import Scoreboard from '../pages/scoreboard';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '../components/Navbar';
import Settings from '../pages/settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='game' element={<Game />} />
            <Route path='scoreboard' element={<Scoreboard />} />
            <Route path='settings' element={<Settings />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
