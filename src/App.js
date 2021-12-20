import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Button from "./components/Button/Button";
import Loading from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
function App() {
  return (
    <>
      <Searchbar />
      <ImageGallery />
      <ImageGalleryItem />
      <Button />
      <Loading />
      <Modal />
    </>
  );
}

export default App;
