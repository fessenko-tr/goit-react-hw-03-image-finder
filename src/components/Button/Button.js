import PropTypes from "prop-types";
import s from "./Button.module.css";

function Button({ loadMore }) {
  const { Button } = s;

  return (
    <button className={Button} onClick={loadMore}>
      Load More
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
export default Button;
