import React from "react";
import classes from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.spinner}></div>
      <p className={classes.message}>Loading...</p>
    </div>
  );
};

export default Loader;
