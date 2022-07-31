import { createPortal } from "react-dom";

// Spinner gif
import spinnerGif from "../../assets/loading-spinner.gif";

// Styles
import style from "../../styles/loading-spinner/loading-spinner.module.css";

const LoadingSpinner = ({ external }) => {
  const spinner = <img src={spinnerGif} alt="loading-spinner" />;
  if (external) {
    return createPortal(
      <div className={style["spinner-overlay"]}>{spinner}</div>,
      document.getElementById("root")
    );
  }
  return <>{spinner}</>;
};

export default LoadingSpinner;
