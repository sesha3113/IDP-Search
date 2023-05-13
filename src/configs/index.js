const BFF_DOMAIN = "api.passport.stg.idp.com";
const BASE_PATH = "sp-app";
const VERSION = "v5";

const courseUrl = `https://${BFF_DOMAIN}/${BASE_PATH}/${VERSION}/mobile-app/get-component-data`;

const serverUrl = "https://k5fq0xr7sk.execute-api.ap-south-1.amazonaws.com/dev";

const getIpURL = `${serverUrl}/getip`;

const createAccountPath = "create-account";

const loginPath = "login";

const profilePath = "profile";

const iframeUrl = "https://accounts.dev.idp.com";

const origin = `https://ui.htcpoc.com`;

export const config = {
  courseUrl,
  serverUrl,
  getIpURL,
  iframeUrl,
  createAccountPath,
  loginPath,
  profilePath,
  origin
};

export const GoogleAnalytics = {
  ga_url: 'https://www.googletagmanager.com/gtag/js?id=G-RNYB7SV8YK',
  ga_code: `
  window.dataLayer = window.dataLayer || [];   
  function gtag(){dataLayer.push(arguments);}   
  gtag('js', new Date());   
  gtag('config', 'G-RNYB7SV8YK');  
  `,
  gtm_url: 'https://www.googletagmanager.com/ns.html?id=GTM-NPJ3X2L',
  ui_poc_gtm: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NPJ3X2L');
  `,
};
