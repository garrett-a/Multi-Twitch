import React, { Fragment, useState, useContext, useEffect } from "react";

import classes from "./HomePage.module.css";
import StoreContext from "../../store/store-context";

const HomePage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const ctx = useContext(StoreContext);

  const scope = encodeURIComponent("user:read:follows user:read:email");
  const authHref = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=owb00645opxcsak6j0dwv4w5ue7pcb&redirect_uri=https://multi-live.netlify.app/&scope=${scope}`;

  const hashConfirm = window.location.hash.substring(1).split("=", [1]).shift();

  console.log(hashConfirm);

  useEffect(() => {
    if (hashConfirm === "access_token") {
      return setIsAuth(isAuth);
    }

    if (hashConfirm === "error") {
      return setIsAuth(!isAuth);
    }
  }, [hashConfirm, isAuth]);

  return (
    <Fragment>
      <div className={classes.homepage}>
        <div className={classes.card}>
          <h2>Welcome to Multi-live.</h2>
          <h3>Search a twitch stream.</h3>
          <h3>View up to four at once.</h3>
          {!isAuth ? (
            <div className={classes.auth}>
              <button>
                <a href={authHref}>Authorize</a>
              </button>
              <br />
              <span>Click to get your followed streams!</span>
            </div>
          ) : (
            <span>
              Hey {ctx.userInfo[0].label}
              <img src={ctx.userInfo[0].img} alt="users logo"></img> , happy
              viewing!
            </span>
          )}
          {/* {isAuth && (
            <div>
              <span>
                Hey <img src={ctx.userInfo[0].img} alt="users logo"></img>{" "}
                {ctx.userInfo[0].label}, happy viewing!
              </span>
            </div>
          )} */}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
