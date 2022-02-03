import Loader from "../components/molecules/Loader";
import InstaProvider from "../context/InstaProvider";
import "../styles/globals.css";
import "../styles/p5.scss";

function MyApp({ Component, pageProps }) {
  return (
    <InstaProvider>
      <div className="container">
        <Loader />
        <Component {...pageProps} />
      </div>
    </InstaProvider>
  );
}

export default MyApp;
