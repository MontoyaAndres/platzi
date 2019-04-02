import React, { memo } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const portada = ({ menu, logo, isAnimated }) => (
  <section
    id="portada"
    className={`portada background ${isAnimated ? isAnimated : ""}`}
  >
    <header id="header" className="header contenedor">
      <figure className="logotipo">
        <img src={logo} width="186" height="60" alt="Invie logotipo" />
      </figure>
      <span className="burguer-button icon-menu" id="burguer-button" />
      <nav className="menu" id="menu">
        <ul>
          {menu.map((item, i) => (
            <li key={i}>
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <ReactCSSTransitionGroup
      transitionName="animationInOut"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={800}
    >
      {!isAnimated && (
        <div className="contenedor" key="portada">
          <h1 className="titulo">
            Guitarras <span>invie</span>sibles
          </h1>
          <h3 className="title-a">
            Sé la estrella de rock que siempre quisiste ser
          </h3>
          <a className="button" href="#guitarras">
            Conoce más
          </a>
        </div>
      )}
    </ReactCSSTransitionGroup>
  </section>
);

export default memo(portada);
