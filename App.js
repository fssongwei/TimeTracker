import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "@ant-design/react-native";
import Navigator from "./navigations/Navigator";

class App extends React.Component {
  state = {
    theme: null,
    currentTheme: null,
    isReady: false,
  };
  changeTheme = (theme, currentTheme) => {
    this.setState({ theme, currentTheme });
  };
  async componentDidMount() {
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
    this.setState({ isReady: true });
  }
  render() {
    const { theme, currentTheme, isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (
      <Provider>
        <Navigator />
      </Provider>
    );
  }
}

// const App = () => {
//   return <TabNavigator />;
// };

export default App;
