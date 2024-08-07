import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColourModeContext } from "../ColourModeContext";
import { getTheme } from "../../theme";


export default function ColourModeContextProvider({ children }) {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        const initialMode = localStorage.getItem('mode');
        if (initialMode) {
            setMode(initialMode);
        }
    }, []);

    const updateMode = (newMode) => {
        console.log(newMode);
        setMode(newMode);
        localStorage.setItem('mode', newMode);
    };

    const colourMode = useMemo(
        () => ({
            toggleColourMode: () => {
                updateMode((mode === "light" ? "dark" : "light"));
            },  
            mode,
        }),
        [mode]
    );
    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ColourModeContext.Provider value={colourMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColourModeContext.Provider>
    );
}