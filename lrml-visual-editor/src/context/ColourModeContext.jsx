import { createContext } from "react";

export const ColourModeContext = createContext({ toggleColourMode: () => { }, mode: "light"});
