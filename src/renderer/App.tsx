import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SocketProvider from './context/socket.context';
import './App.css';
import Home from './pages/home';
import theme from './theme';
import Start from './pages/start';
import store from './redux/store';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <SocketProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/dashboard" element={<Home />} />
              </Routes>
            </Router>
          </SocketProvider>
        </DndProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
}
