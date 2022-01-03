import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Loader.module.css";

function Loading() {
  return (
    <Loader
      type="Hearts"
      color="#b81e0d"
      height={100}
      width={100}
      timeout={3000} //3 secs
      className={s.loader}
    />
  );
}

export default Loading;
