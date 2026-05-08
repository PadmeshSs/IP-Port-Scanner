import { useMemo, createContext } from "react";
import { createTheme } from "@mui/material/styles";

type ColorScale = {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

type Tokens = {
    text: ColorScale
    bg: ColorScale
    box: ColorScale
    button: ColorScale
}

type SidebarContextType = {
    isSidebarOpen: boolean;
    isBroken: boolean;
    setBroken: (value:boolean) => void;
    toggleSidebar: () => void;
}



//all colors we will use in the app
export function tokens(): Tokens {
    return {
        bg: {
            100: "#d0d1d2",
            200: "#a0a2a6",
            300: "#717479",
            400: "#41454d",
            500: "#121720",
            600: "#0e121a",
            700: "#0b0e13",
            800: "#07090d",
            900: "#040506"
        },
        box: {
            100: "#d3d5d7",
            200: "#a8abb0",
            300: "#7c8088",
            400: "#515661",
            500: "#252c39",
            600: "#1e232e",
            700: "#161a22",
            800: "#0f1217",
            900: "#07090b"
        },
        text: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff",
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
        button: {
            100: "#eafdf2",
            200: "#d5fbe4",
            300: "#c0f8d7",
            400: "#abf6c9",
            500: "#96f4bc",
            600: "#78c396",
            700: "#5a9271",
            800: "#3c624b",
            900: "#1e3126"
        }
    };
}




//mui theme settings
export function themeSettings() {
    const colors = tokens();

    return {
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                Tablet: 768,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        },
        palette: {       
            primary: {
                main: colors.text[500]
            },
            background: {
                default: colors.bg[500]
            },
            secondary:{
                main: colors.button[500]
            }         
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24           
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14           
            }
        }
    };
}

export function useMode(){

    const theme = useMemo(() => createTheme(themeSettings()), []);

    return theme;
}


export const SidebarContext = createContext<SidebarContextType>({
    isSidebarOpen: true,
    toggleSidebar: () => {},
    isBroken: true,
    setBroken: ()=>{},
});



