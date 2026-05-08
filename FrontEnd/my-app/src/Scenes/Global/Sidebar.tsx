import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { tokens} from "../../Themes";
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { SidebarContext } from "../../Themes";



export default function ProSidebar() {
    const colors = tokens();
    const { isSidebarOpen, toggleSidebar, setBroken, isBroken } = useContext(SidebarContext);
    const [selected, setSelected] = useState<String>("Dashboard");

    return (
        <Sidebar
        collapsed={isBroken ? false : !isSidebarOpen}
        toggled={isBroken ? isSidebarOpen : undefined}
        backgroundColor={colors.box[500]}
        rootStyles={{ border: 0 }}
        customBreakPoint="1200px"
        onBreakPoint={setBroken}
        >
            <Box display="flex" flexDirection="column" gap={5}>
                <Menu menuItemStyles={{
                button: {
                "&:hover": {
                    backgroundColor: "transparent",
                }}
                    }} >
                    <MenuItem
                        icon={!isSidebarOpen ? <MenuIcon onClick={toggleSidebar}/> : undefined}
                        style={{
                            margin: "20px 0px",
                            color: colors.text[500],
                        }}>
                        {isSidebarOpen && (
                            <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            >
                            <img src={logo} alt="Logo" width={40} style={{
                                
                            }}/>
                            <Typography variant="h5" color={colors.text[500]} fontWeight={'bold'}>
                                Advanced IP &<br /> Port Scanner
                            </Typography>
                            <IconButton>
                                <MenuIcon onClick={toggleSidebar} sx={{
                                    color: 'white'
                                }}/>
                            </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                </Menu>

                {/* actual menu */}
                <Box>
                    <Menu menuItemStyles={{
                        button: {
                            "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: colors.button[500],
                            borderRadius: "5px",
                            borderLeft: `2px solid ${colors.button[500]}`,
                            "& .ps-menu-icon": {
                            color: colors.button[500],
                            },
                            "& .ps-menu-label": {
                            color: colors.button[500],
                            }, 
                        }}
                    }}>                           
                        <MenuItem
                        active={selected === "Dashboard"}
                        style={{ color: colors.text[500] }}
                        onClick={() => setSelected("Dashboard")}
                        icon={<HomeIcon />}
                        >
                            <Box >
                                Scan Dashboard
                            </Box>
                        </MenuItem>
                        <MenuItem
                            active={selected === "Results"}
                            style={{ color: colors.text[500] }}
                            onClick={() => setSelected("Results")}
                            icon={<AccessTimeIcon />}
                        >
                            <Box >
                                Scan Results
                            </Box>
                        </MenuItem>
                        <MenuItem
                            active={selected === "Reports"}
                            style={{ color: colors.text[500] }}
                            onClick={() => setSelected("Reports")}
                            icon={<EmailIcon />}
                        >
                            <Box >
                                Scan Reports
                            </Box>
                        </MenuItem>
                        <MenuItem
                            active={selected === "Settings"}
                            style={{ color: colors.text[500] }}
                            onClick={() => setSelected("Settings")}
                            icon={<SettingsIcon />}
                        >
                            <Box >
                                Settings
                            </Box>
                        </MenuItem>
                    </Menu>
                </Box>
                
            </Box>                
        </Sidebar>
    );
}