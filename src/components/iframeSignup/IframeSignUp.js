import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./IframeSignup.module.scss";
import { config } from "../../configs";
import { utils } from "../../utils";
import { AppContext } from "../../context/AppContext";

const IframeSignup = () => {
  const IFrameRef = useRef(null);
  const { iframeUrl, createAccountPath, loginPath, profilePath } = config;
  const { setIsAuthenticated, isAuthenticated, loginType, setLoginType, islogout, setIsLogout } = useContext(AppContext);
  const [iframeUrlPath, setIframeUrlPath] = useState( isAuthenticated ? profilePath : createAccountPath);
  const { parser, setSessionStorage, getSessionStorage, clearSessionStorage } = utils;
  useEffect(() => {
    window.addEventListener("message", async function (e) {
      if (e.origin !== iframeUrl) return;
      const eventData = new Promise((resolve) => {
        if(typeof e.data === 'string') {
          resolve(parser(e.data));
        } else {
          resolve(e.data)
        }
      });
      eventData.then((event) => {
        console.log(event);
        switch (true) {
          case (event.accesstoken != null && event.authenticatedEmail != null): {
            setSessionStorage("token", event.accesstoken);
            const name = event.authenticatedEmail.split('.')
            setSessionStorage("user", name[0][0]+name[1][0])
            setIsAuthenticated(true);
            setIframeUrlPath(profilePath);
            setLoginType('iframe-login')
          }
          break ;
          case event.redirectPage == "login" && !isAuthenticated: {
            setIframeUrlPath(loginPath);
            break;
          }
          case event.redirectPage == "createAccount" && !isAuthenticated: {
            setIframeUrlPath(createAccountPath);
            break;
          }
          default:
            break;
        }
      });
    });
  }, []);

  useEffect(() => {
    if(islogout && loginType == 'iframe-login') {
      const win = IFrameRef.current.contentWindow;
      win.postMessage(JSON.stringify({ isLogOut: "true", emailId: getSessionStorage('user') }), "*");
      clearSessionStorage('token');
      clearSessionStorage('user');
      setIsAuthenticated(false)
      setIsLogout(false)
    }
  }, [islogout])
  
  return (
    <>
      <div className={styles.IframeContainer} key={iframeUrlPath}>
        <iframe
          ref={IFrameRef}
          src={`${iframeUrl}/${iframeUrlPath}`}
          id="CognitoIFrame"
          className="w-100 h-100"
        />
      </div>
    </>
  );
};

export default IframeSignup;
