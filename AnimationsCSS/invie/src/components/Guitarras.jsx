import React, { memo } from "react";

const guitarras = ({ guitarras }) => (
  <section id="guitarras" className="guitarras contenedor">
    <h2>Nuestra guitarras</h2>
    <div className="video-demo-contenedor">
      <div className="video-demo">
        <div className="video-responsive-contenedor">
          <iframe
            title="video"
            className="video-responsive-src"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/R1dW8M4EqYY"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>

    {guitarras.map((guitarra, i) => (
      <article className="guitarra" key={i}>
        <img
          className="guitarra-image"
          src={guitarra.image}
          alt={guitarra.alt}
          width="350"
        />
        <div className="contenedor-guitarra">
          <h3 className="guitarra-name">{guitarra.name}</h3>
          <ol>
            {guitarra.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ol>
        </div>
      </article>
    ))}
  </section>
);

export default memo(guitarras);
