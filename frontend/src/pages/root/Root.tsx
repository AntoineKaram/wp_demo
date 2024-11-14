import React, { useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { scrollToTop } from "../../helper";
import { uiActions } from "../../store/ui-slice";
import Tooltip from "../../components/tooltip/Tooltip";
import { StoreDispatch, StoreState } from "../../store";

import classes from "./Root.module.css";
import { FaArrowUp } from "react-icons/fa6";

const Root: React.FC = () => {
  const dispatch = useDispatch<StoreDispatch>();

  const isScrolled = useSelector((state: StoreState) => state.ui.isScrolled);

  const handleScroll = useCallback(() => {
    const myDiv = document.getElementById("root-outlet");
    if (myDiv) {
      const scrollTop = myDiv.scrollTop;
      if (scrollTop >= 50) {
        dispatch(uiActions.setIsScrolled(true));
      } else {
        dispatch(uiActions.setIsScrolled(false));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    //implement authorization and refresh token here
    uiActions.setIsLoading(true);
    setTimeout(() => {
      uiActions.setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div id="root-outlet" onScroll={handleScroll} className={classes.outlet}>
      <Outlet />
      {isScrolled && (
        <div className={classes.fabContainer}>
          <Tooltip text="Move to top">
            <Button
              onClick={scrollToTop()}
              className={`${classes.fab} rounded-circle`}
            >
              <FaArrowUp size="30" />
            </Button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
export default Root;
