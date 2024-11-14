/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useLocation, useRouteError } from "react-router-dom";

import classes from "./ErrorPage.module.css";

const ErrorPage: React.FC = () => {
  const { state } = useLocation();
  const error: any = useRouteError();

  const status = state?.status ?? error?.status;

  let title = state?.title ?? "An error occurred!";
  let description = state?.description ?? "Something went wrong!";
  if (status === 500) {
    description = error.data.message;
  }

  if (status === 404) {
    title = "Oops! Page Not Found";
    description = `
The page you are looking for doesn’t exist or an error occurred. Please
try again or go back to the homepage.
`;
  }
  return (
    <div className={classes.errorContainer}>
      {status && <h1 className={classes.errorCode}>{status}</h1>}
      <h2 className={classes.errorMessage}>{title}</h2>
      <p className={classes.errorDescription}>{description}</p>
      <a href="/" className={classes.homeButton}>
        Go to Homepage
      </a>
    </div>
  );
};

export default ErrorPage;
