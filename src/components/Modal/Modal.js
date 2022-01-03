import { createPortal } from "react-dom";
import { Component } from "react/cjs/react.production.min";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

class Modal extends Component {
  close = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.close);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.close);
  }

  render() {
    const { modal, overlay } = s;
    const { closeModal, modalImg } = this.props;

    return createPortal(
      <div onClick={closeModal} className={overlay}>
        <div className={modal}>
          <img src={modalImg} alt="Big Modal Picture" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
};

export default Modal;
