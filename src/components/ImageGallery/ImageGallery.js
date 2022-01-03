import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";

function ImageGallery({ picsArray, openModal }) {
  const imagesList = picsArray.map((el) => (
    <ImageGalleryItem
      key={el.pageURL}
      imgModal={el.largeImageURL}
      imgPreview={el.webformatURL}
      openModal={openModal}
    />
  ));
  return <ul className={s.ImageGallery}>{imagesList}</ul>;
}
ImageGallery.propTypes = {
  picsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
