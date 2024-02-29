import React from "react";
import BottomNavigation from "./src/navigation/bottom/bottom-nav";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <BottomNavigation />
    </Provider>
  );
}

export default App;
