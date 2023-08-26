import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { I18nextProvider } from 'react-i18next';
import SocketProvider from './context/socket.context';
import './App.css';
import Device from './pages/device';
import theme from './theme';
import Devices from './pages/home/devices';
import store from './redux/store';
import i18n from './i18n';
import HomePage from './pages/home';
import PluginsPage from './pages/home/plugins';
import AboutPage from './pages/home/about';

const AppRouter = () => {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode('dark');
  }, [setColorMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Devices />} />
          <Route path="plugins" element={<PluginsPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route path="dashboard" element={<Device />} />
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <DndProvider backend={HTML5Backend}>
            <SocketProvider>
              <AppRouter />
            </SocketProvider>
          </DndProvider>
        </ChakraProvider>
      </ReduxProvider>
    </I18nextProvider>
  );
}
