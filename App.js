import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "@ant-design/react-native";
import { Provider as ReduxProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import store from "./store";

import Navigator from "./navigations/Navigator";

const App = () => {
  const [theme, setTheme] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [isReady, setIsReady] = useState(false);

  changeTheme = (theme, currentTheme) => {
    setTheme(theme);
    setCurrentTheme(currentTheme);
  };
  useEffect(() => {
    const loadFunc = async () => {
      await Font.loadAsync(
        "antoutline",
        // eslint-disable-next-line
        require("@ant-design/icons-react-native/fonts/antoutline.ttf")
      );

      await Font.loadAsync(
        "antfill",
        // eslint-disable-next-line
        require("@ant-design/icons-react-native/fonts/antfill.ttf")
      );
      // eslint-disable-next-line
      setIsReady(true);
    };
    loadFunc();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <ReduxProvider store={store}>
      <Provider>
        <Navigator />
      </Provider>
    </ReduxProvider>
  );
};

export default App;
