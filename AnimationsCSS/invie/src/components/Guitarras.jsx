import React, { memo } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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
        <ReactCSSTransitionGroup
          transitionName="flicker"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <img
            className="guitarra-image"
            key={guitarra.image}
            src={guitarra.image}
            alt={guitarra.alt}
            width="350"
          />
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          <div className="contenedor-guitarra" key={guitarra.name}>
            <h3 className="guitarra-name">{guitarra.name}</h3>
            <ol>
              {guitarra.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ol>
          </div>
        </ReactCSSTransitionGroup>
      </article>
    ))}
  </section>
);

export default memo(guitarras);
