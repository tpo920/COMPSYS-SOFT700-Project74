import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: "#8A9BF8"
            }
        },
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: mode === "dark" ? "#333333" : "#fff",                
                    },
                },
            },  
        }
    });
}