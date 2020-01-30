import React, { useState } from "react";
import PropTypes from "prop-types";

class Drawer extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.expanded && this.props.expanded) {
      setTimeout(() => this.refs.container.focus(), 350);
    }
  }

  render() {
    const { id, expanded } = this.props;

    return (
      <div
        ref="container"
        id={id}
        className="Drawer"
        aria-expanded={expanded ? "false" : "true"}
        tabIndex="0"
      >
        {this.props.children}

        <style jsx>
        {` 
        .Drawer {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 42vh;
            transform: translate(0, 70vh);
            will-change: transform; 
            background-color: white;
            color: black;
        }

        .Drawer[aria-expanded="false"] {
            transform: translate(0, 50vh);
            transition: transform 0.25s linear;
        }

        .Drawer[aria-expanded="true"] {
            transition: transform 0.25s linear;
        }
        
        `}
        </style>
      </div>
    );
  }
}

Drawer.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    visible: PropTypes.bool
};

export default Drawer;