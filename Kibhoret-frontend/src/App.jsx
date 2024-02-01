import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Trucks from "./scenes/trucks";
import Gate from "./scenes/gate";
import GateIn from "./scenes/gateIn";
import GateOut from "./scenes/gateOut";
import WeighBridge from "./scenes/weighBridge";
import WeighBridgeIn from "./scenes/weighBridgeIn";
import WeighBridgeOut from "./scenes/weighBridgeOut";
import Sampling from "./scenes/sampling";
import Lab from "./scenes/lab";
import Offloading from "./scenes/offloading";
// import Admin from "./scenes/admin";
// import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trucks" element={<Trucks />} />
              <Route path="/gate" element={<Gate />} />
              <Route path="/gate/in" element={<GateIn />} />
              <Route path="/gate/out" element={<GateOut />} />
              <Route path="/weighbridge" element={<WeighBridge />} />
              <Route path="/weighbridge/in" element={<WeighBridgeIn />} />
              <Route path="/weighbridge/out" element={<WeighBridgeOut />} />
              <Route path="/sampling" element={<Sampling />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/offloading" element={<Offloading />} />
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
