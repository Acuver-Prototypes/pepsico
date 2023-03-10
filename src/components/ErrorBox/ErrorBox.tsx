import React from "react";

interface Props {
  text: string;
  classes? : string
}

const ErrorBox = ({ text, classes }: Props) => {
  return <div className={`error text-red-400 text-sm ${classes}`}>{text}</div>;
};

export default ErrorBox;
