import {Box, IconButton, useTheme, Typography} from '@mui/material';
import { useContext } from "react";
import { tokens } from "../../Themes";
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarContext } from '../../Themes';



export default function Topbar() {
    const theme = useTheme();
    const colors = tokens();
    const { toggleSidebar, isBroken } = useContext(SidebarContext);


    return (
        <Box display="flex" alignItems="center" p={2} pt={4}>
            {isBroken &&     
                <Box>
                    <IconButton onClick={toggleSidebar} sx={{
                        color: theme.palette.primary.main}}>
                            <MenuIcon />
                    </IconButton>
                </Box>}
            <Box sx={{
                color: theme.palette.primary.main, 
            }} display={'flex'}   
            justifyContent={{
                xs: "center",
                lg: "start"
            }} flex={1}>
                <Typography variant="h4" color={colors.text[500]} fontWeight="bold">
                    Scan Dashboard
                </Typography>     
            </Box>
        </Box>
    );
}