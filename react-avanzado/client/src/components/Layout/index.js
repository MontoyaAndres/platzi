import React from "react";
import { Helmet } from "react-helmet";

import { Div, Title, Subtitle } from "./styles";

export const Layout = ({ children, subtitle, title }) => (
  <>
    <Helmet>
      {title && (
        // eslint-disable-next-line jsx-a11y/aria-unsupported-elements
        // eslint-disable-next-line jsx-a11y/accessible-emoji
        <title>{title} | Petgram 🐶</title>
      )}
      {subtitle && <meta name="description" content={subtitle} />}
    </Helmet>
    <Div>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Div>
  </>
);
