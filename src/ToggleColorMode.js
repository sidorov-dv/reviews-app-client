import React, {
  useMemo,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CssBaseline from "@mui/material/CssBaseline";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ControlTheme() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 30,
        bottom: 5,
        right: 5,
      }}
    >
      <IconButton
        style={{ width: 50, height: 50 }}
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon sx={{ fontSize: 35 }} />
        ) : (
          <Brightness4Icon sx={{ fontSize: 35 }} />
        )}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (window.localStorage.getItem("colorMode") === "light") {
      setMode("dark");
    } else {
      window.localStorage.setItem("colorMode", mode);
    }
    // eslint-disable-next-line
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        window.localStorage.setItem("colorMode", mode);
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ControlTheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
