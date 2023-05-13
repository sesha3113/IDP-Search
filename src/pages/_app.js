import '../assets/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from '@/context/AppContext';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { GoogleAnalytics } from '@/configs';
import PropTypes from 'prop-types'
import Wrapper from '../redux/Store';

Amplify.configure({ ...awsExports, ssr: true });

// export function reportWebVitals(metric) {
//   console.log(metric)
// }
const App = ({ Component, pageProps }) => {
  return (
    <>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
      <script defer src={GoogleAnalytics.ga_url}></script>
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: GoogleAnalytics.ui_poc_gtm,
        }}
      ></script>
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: GoogleAnalytics.ga_code,
        }}
      ></script>
      <noscript>
        <iframe
          src={GoogleAnalytics.gtm_url}
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  );
}

App.propTypes ={
  Component: PropTypes.any,
  pageProps:PropTypes.any
}

export default Wrapper.withRedux(App)