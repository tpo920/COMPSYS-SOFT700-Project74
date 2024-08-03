import * as React from 'react';
import { Box, IconButton, AppBar, Toolbar } from "@mui/material";
import logo from '../assets/CAPSTONE700P74.png';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function NavBar({ isDarkTheme, setIsDarkTheme }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: "#8A9BF8", boxShadow: "none" }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="logo" width={300} height={30} />
                    </Box>
                    <IconButton
                        onClick={() => setIsDarkTheme(!isDarkTheme)}
                    >
                        {isDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}