import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Trucks from './scenes/trucks';
import Gate from './scenes/gate';
import GateIn from './scenes/gateIn';
import GateOut from './scenes/gateOut';
import WeighBridge from './scenes/weighBridge';
import WeighBridgeIn from './scenes/weighBridgeIn';
import WeighBridgeOut from './scenes/weighBridgeOut';
import Sampling from './scenes/sampling';
import Lab from './scenes/lab';
import Offloading from './scenes/offloading';
import LoginForm from './scenes/login';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { verifyToken } from './components/auth';
import TruckMonitoringService from './components/truckMonitoring';

function App () {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(verifyToken()); // Check if user is logged in
  const [notification, setNotification] = useState('');
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  // PrivateRoute component to protect routes
  const PrivateRoute = ({ element, ...rest }) => {
    return isLoggedIn ? element : <Navigate to='/login' replace />;
  };
  const handleNotification = (message) => {
    setNotification(message);
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
              <Route path='/login' element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
              <Route path='/' element={<PrivateRoute element={<Dashboard />} />} />
              <Route path='/trucks' element={<PrivateRoute element={<Trucks />} />} />
              <Route path='/gate' element={<PrivateRoute element={<Gate />} />} />
              <Route path='/gate/in' element={<PrivateRoute element={<GateIn />} />} />
              <Route path='/gate/out' element={<PrivateRoute element={<GateOut />} />} />
              <Route path='/weighbridge' element={<PrivateRoute element={<WeighBridge />} />} />
              <Route
                path='/weighbridge/in'
                element={<PrivateRoute element={<WeighBridgeIn />} />}
              />
              <Route
                path='/weighbridge/out'
                element={<PrivateRoute element={<WeighBridgeOut />} />}
              />
              <Route path='/sampling' element={<PrivateRoute element={<Sampling />} />} />
              <Route path='/lab' element={<PrivateRoute element={<Lab />} />} />
              <Route path='/offloading' element={<PrivateRoute element={<Offloading />} />} />

              {/* { <Route path="/admin" element={<Admin />} />} */}
              {/* {  <Route path="/faq" element={<FAQ />} />} */}
              {/* { <Route path="/calendar" element={<Calendar />} />} */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
