import { Component } from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";
import { toast } from "react-toastify";

class Searchbar extends Component {
  state = {
    userValue: "",
  };

  handleChange = (e) => {
    const userValue = e.currentTarget.value;

    this.setState({ userValue });
  };

  handleSubmit = (e) => {
    const { userValue } = this.state;
    const { handleFormSubmit } = this.props;
    e.preventDefault();

    if (!userValue.trim()) {
      return toast.info("Query string is empty");
    }

    handleFormSubmit(userValue);
    this.setState({ userValue: "" });
  };

  render() {
    const { userValue } = this.state;
    const {
      searchbar,
      searchForm,
      searchFormButton,
      searchFormButtonLabel,
      searchFormInput,
    } = s;

    return (
      <header className={searchbar}>
        <form className={searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={searchFormButton}>
            <span className={searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={userValue}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
