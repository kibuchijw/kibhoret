import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Trucks from './scenes/trucks';
import Gate from './scenes/gate/';
import GateForm from './scenes/gate/gate';
import WeighBridge from './scenes/weighBridge';
import WeighBridgeIn from './scenes/weighBridge/in';
import WeighBridgeOut from './scenes/weighBridge/out';
import Lab from './scenes/lab';
import LabForm from './scenes/lab/lab';
import Offloading from './scenes/offloading/';
import OffloadingForm from './scenes/offloading/offloading';
import LoginForm from './scenes/login';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { verifyToken } from './components/Auth';
import TruckMonitoringService from './components/TruckMonitoring';

function App () {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(verifyToken()); // Check if user is logged in
  const [notification, setNotification] = useState([]);
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  // PrivateRoute component to protect routes
  const PrivateRoute = ({ element, ...rest }) => {
    return isLoggedIn ? element : <Navigate to='/login' replace />;
  };
  const handleNotification = (message) => {
    setNotification([message]); // Wrap the message in an array
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
          <main className='content'>
            {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} notifications={notification} />}
            <TruckMonitoringService onNotification={handleNotification} />
            <Routes>
              <Route path='/login' element={isLoggedIn ? <Navigate to='/' replace /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
              <Route path='/' element={<PrivateRoute element={<Dashboard />} />} />
              <Route path='/trucks' element={<PrivateRoute element={<Trucks />} />} />
              <Route path='/gate' element={<PrivateRoute element={<Gate />} />} />
              <Route path='/gate/form' element={<PrivateRoute element={<GateForm />} />} />
              <Route path='/weighbridge' element={<PrivateRoute element={<WeighBridge />} />} />
              <Route path='/weighbridge/in' element={<PrivateRoute element={<WeighBridgeIn />} />} />
              <Route path='/weighbridge/out' element={<PrivateRoute element={<WeighBridgeOut />} />} />
              <Route path='/lab' element={<PrivateRoute element={<Lab />} />} />
              <Route path='/lab/form' element={<PrivateRoute element={<LabForm />} />} />
              <Route path='/offloading' element={<PrivateRoute element={<Offloading />} />} />
              <Route path='/offloading/form' element={<PrivateRoute element={<OffloadingForm />} />} />
              {/* Catch all other random routes */}
              <Route path='*' element={isLoggedIn ? <Navigate to='/' replace /> : <Navigate to='/login' replace />} />

              {/* { <Route path="/admin" element={<Admin />} />} */}
              {/* {  <Route path="/metrics" element={<FAQ />} />} */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
