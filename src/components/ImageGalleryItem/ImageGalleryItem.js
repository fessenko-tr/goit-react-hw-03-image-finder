import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ imgPreview, imgModal, openModal }) {
  const { ImageGalleryItem, ImageGalleryItemImage } = s;
  return (
    <li
      onClick={() => {
        openModal(imgModal);
      }}
      className={ImageGalleryItem}
    >
      <img
        src={imgPreview}
        alt="Gallery Item Pic"
        className={ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imgPreview: PropTypes.string.isRequired,
  imgModal: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
