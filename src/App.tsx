import {FC, useState} from "react";
import { createTheme } from "@material-ui/core";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts";
import { themeL, themeD } from "./themes";
import { mainNavigation, mainRoutes } from "./data";
import { RoutesWithLayout } from "./components";

import { store } from "./redux/store";

const App: FC = () => {
  const [darkMode, setDarkMode] = useState<any>(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      return JSON.parse(dark);
    } else {
      return false;
    }
  });

  const darkModeToggle = () => {
    setDarkMode(!darkMode);

    //@ts-ignore
    localStorage.setItem("dark", !darkMode);
  };

  const themeSwitchCofig = {
    state: darkMode,
    handler: darkModeToggle,
  };

    //@ts-ignore
  const appliedTheme = createTheme(darkMode ? themeD : themeL);
  return (
    <BrowserRouter>
    <ReduxProvider store={store}>
    <ThemeProvider theme={appliedTheme}>
        <RoutesWithLayout
          layout={MainLayout}
          routes={mainRoutes}
          LayoutProps={{
            navigationData: mainNavigation,
            themeConfig: themeSwitchCofig,
          }}
        />
      </ThemeProvider>
    </ReduxProvider>
    
    </BrowserRouter>
  );
};

export default App;

