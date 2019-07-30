import React from "react"

import { Content, Footer } from "../styles/components"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>
        <main>{children}</main>
        <Footer>
          con ♥︎ por
          <a href="https://www.resume.andresmontoyain.now.sh">Andrés</a>
        </Footer>
      </Content>
    </>
  )
}

export default Layout
