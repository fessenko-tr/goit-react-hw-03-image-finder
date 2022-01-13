import s from "./App.module.css";
import { Component } from "react/cjs/react.production.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loading from "./components/Loader";
import Modal from "./components/Modal";

import fetchPics from "./api/pixabay";

class App extends Component {
  state = {
    userInput: "",
    isLoading: false,
    pics: [],
    page: 1,
    maxPageReached: true,
    isModalOpened: false,
    modalURL: "",
  };

  async componentDidUpdate(prevProps, prevState) {
    const { userInput: prevUserInput, page: prevPage } = prevState;
    const { userInput: currentUserInput, page: currentPage } = this.state;

    if (currentPage === prevPage && currentUserInput === prevUserInput) {
      return;
    }
    this.setPictures();
  }

  setPictures = async () => {
    const { userInput: q, page } = this.state;

    this.setState({ isLoading: true });

    try {
      const hits = await fetchPics(q, page);

      this.setState((current) => ({
        pics: [...current.pics, ...hits],
      }));
      this.isMaxPageReached(hits);
    } catch (error) {
      toast.info(error.message);
      this.setState({ maxPageReached: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = (userInput) => {
    this.setState(({ userInput: prevUserInput, page }) => {
      if (page === 1 && prevUserInput === userInput) {
        return;
      }
      return { userInput, page: 1, pics: [] };
    });
  };

  updatePage = () => {
    this.setState((current) => ({ page: current.page + 1 }));
  };

  isMaxPageReached = (response) => {
    if (response.length < 12) {
      this.setState({ maxPageReached: true });
    } else {
      this.setState({ maxPageReached: false });
    }
  };

  openModal = (url) => {
    this.setState({ modalURL: url, isModalOpened: true });
  };

  closeModal = () => {
    this.setState({ modalURL: "", isModalOpened: false });
  };

  render() {
    const { pics, isLoading, isModalOpened, maxPageReached, modalURL } =
      this.state;

    return (
      <div className={s.App}>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />

        <ImageGallery openModal={this.openModal} picsArray={pics} />

        {isLoading && <Loading />}

        {!isLoading && !maxPageReached && <Button loadMore={this.updatePage} />}

        {isModalOpened && (
          <Modal closeModal={this.closeModal} modalImg={modalURL} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
