import React, { ReactNode } from "react";
import PropTypes from "prop-types";

interface CardProps {
  children: ReactNode;
  bg?: string;
}

const Card: React.FC<CardProps> = ({ children, bg = "bg-gray-100" }) => {
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
};

export default Card;
