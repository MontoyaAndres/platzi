import React from "react"
import { Link } from "gatsby"

import { SEO } from "../components"
import { Button, Purchase } from "../styles/components"

export default () => {
  return (
    <>
      <SEO title="Compra Exitosa" />
      <Purchase>
        <h2>Compra Exitosa</h2>
        <p>Espero que disfrutes tu swag, lucelo con orgullo</p>
        <p>¡Te esperamos de vuelta, no pares de aprender!</p>
        <span role="img" aria-labelledby="emoji">
          ❤️
        </span>
        <Link to="/">
          <Button>Volver al Catálogo</Button>
        </Link>
      </Purchase>
    </>
  )
}
