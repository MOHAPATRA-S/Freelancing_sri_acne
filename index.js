import { registerRootComponent } from "expo";

import App from "./app/App";
import Navigator from "./app/App";

import { Provider } from "react-redux";
import React, { Component, useState } from "react";

import configureStore from "./app/store/configureStore";

console.log("configureStore =>", configureStore);

const store = configureStore();

console.log("Created Store =>", store);

const applyRedux = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(applyRedux);
