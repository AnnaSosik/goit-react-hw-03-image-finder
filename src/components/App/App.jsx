import { Component } from 'react';
import * as API from '../../services/PixabayApi';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchName: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
  };

  // Lifecycle method: called when the component is updated
  componentDidUpdate(_, prevState) {
    // Check if the request or page number has changed
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages(); // Receive and add images to the state
    }
  }

  // Method for loading additional images by incrementing the current page number
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Method for handling the submission of the search form
  handleSubmit = query => {
    this.setState({
      searchName: query, // Set the entered query to the state

      images: [], // Clear the array with images

      currentPage: 1, // Reset the current page number to the first page number
    });
  };

  // Method for getting and adding images to the state
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });

      // Get the data using the API request to Pixabay
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        // If no images are found, display a message
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      // Normalise the obtained images
      const normalizedImages = API.normalizedImages(data.hits);
      this.setState(state => ({
        images: [...state.images, ...normalizedImages], // Add new images to existing images
        isLoading: false, // Reset the boot flag

        error: '', // Clear the error message

        totalPages: Math.ceil(data.totalHits / 12), // Calculate the total number of pages
      }));
      // If there is an error, print a message
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });

      // Reset the boot flag anyway
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              marginTop: 150,
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty...
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          // Button for downloading additional images
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export default App;
