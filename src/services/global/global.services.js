import { config } from "../../configs/index";

const GlobalService = {
    getSecretData: () => {
      const {origin} = config;
      return fetch(`${origin}/api/getSecret`);
    },
  };
  
  const { getSecretData } = GlobalService;
  
  export { getSecretData };