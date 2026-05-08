import { useMode, SidebarContext } from './Themes'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Topbar from './Scenes/Global/Topbar'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ProSidebar from './Scenes/Global/Sidebar'
import { useState } from 'react';
import Dashboard from './Scenes/Dashboard/Dashboard'


function App() {
  const theme = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isBroken, setBroken] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
        <ThemeProvider theme={theme}>
          <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, isBroken, setBroken}}>
            <CssBaseline />
            <div className='app'>
              <ProSidebar />
              <main className='content'>
                <Topbar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
              </main>
            </div>
          </SidebarContext.Provider>
        </ThemeProvider>
    </>
  )
}

export default App
