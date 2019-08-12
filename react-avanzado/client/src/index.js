import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App";
import Context from "./Context";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3500/graphql"
      : process.env.REACT_APP_GRAPHQL_API,
  request: operation => {
    const token = window.sessionStorage.getItem("token");
    const authorization = token ? `Bearer ${token}` : "";

    operation.setContext({
      headers: {
        authorization
      }
    });
  },
  onError: error => {
    const { networkError } = error;

    if (networkError && networkError.result.code === "invalid_token") {
      window.sessionStorage.removeItem("token");
      window.location.href = "/";
    }
  }
});

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
