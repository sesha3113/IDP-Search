import { createContext, useState, useEffect } from "react";
import { utils } from "@/utils";
import PropTypes from 'prop-types'

export const AppContext = createContext();


const ContextProvider = ({ children }) => {
  const { getSessionStorage } = utils;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [islogout, setIsLogout] = useState(false);
  const [username, setUsername] = useState();
  const [loginType, setLoginType] = useState('');
  const [imageQuality, setimageQuality] = useState(50)
  const [ locationContext, setLocationContext ] = useState();
  const [ pass, setPass ] = useState();

  useEffect(() => {
    setIsAuthenticated(getSessionStorage('token') ? true : false)
    window.innerWidth >= 768  && setimageQuality(75)
  }, [])
  
  const value = {
    isAuthenticated,
    setIsAuthenticated,
    islogout,
    setIsLogout,
    username,
    setUsername,
    loginType,
    setLoginType,
    imageQuality,
    locationContext,
    setLocationContext,
    pass,
    setPass,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default ContextProvider;

ContextProvider.propTypes ={
  children: PropTypes.any,
}