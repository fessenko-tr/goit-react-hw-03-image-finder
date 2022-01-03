import "./App.css";
import { Component } from "react/cjs/react.production.min";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loading from "./components/Loader/Loader";
import Modal from "./components/Modal";

import axiosInstance from "./api/pixabay";

class App extends Component {
  state = {
    userInput: "",
    isLoading: false,
    pics: null,
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
    this.setState({ isLoading: true });

    try {
      const hits = await this.fetchPics();

      this.setState((current) => ({
        pics: [...current.pics, ...hits],
      }));
      this.isMaxPageReached(hits);
    } catch (error) {
      console.log("oh no...meow", error);
      this.setState({ maxPageReached: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  fetchPics = async () => {
    const { data } = await axiosInstance.request({
      params: { q: this.state.userInput, page: this.state.page },
    });
    const hits = data.hits;

    if (!hits.length) {
      throw new Error("oppsie nothing is found");
    }

    return hits;
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
    if (response?.length < 3) {
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
    console.log(pics);

    return (
      <>
        <Searchbar handleFormSubmit={this.handleFormSubmit} />

        {pics && <ImageGallery openModal={this.openModal} picsArray={pics} />}

        {isLoading && <Loading />}

        {!isLoading && !maxPageReached && <Button loadMore={this.updatePage} />}

        {isModalOpened && (
          <Modal closeModal={this.closeModal} modalImg={modalURL} />
        )}
      </>
    );
  }
}

export default App;
