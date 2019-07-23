import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";

import AuthService from "../services/AuthService";

const callbackStyles = {
  padding: "90px 20px 30px",
  maxWidth: "550px",
  width: "100%",
  margin: "0 auto",
  textAlign: "center"
};

const imageStyles = {
  width: "100%",
  marginBottom: "30px"
};

const loadingStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const titleStyles = {
  margin: "0 10px"
};

function CallbackPage() {
  useEffect(() => {
    const authService = new AuthService();
    authService.handleAuthentication().finally(() => {
      window.location.href = "/";
    });
  }, []);

  return (
    <div style={callbackStyles}>
      <img style={imageStyles} src="/static/images/empty-posts.svg" />
      <div style={loadingStyles}>
        <h1 style={titleStyles}>Autenticando</h1>
        <Loader active inline />
      </div>
    </div>
  );
}

export default CallbackPage;
