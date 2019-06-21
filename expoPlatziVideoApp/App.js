import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

import Loading from "./src/sections/components/loading";
/* import AppLayout from "./src/app"; */
import AppNavigationWithState from "./src/app-navigator-with-state";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppNavigationWithState />
      </PersistGate>
    </Provider>
  );
}

export default App;
