import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

// Stores the state of the modal window (open or closed)
class ImageItem extends Component {
  state = {
    showModal: false,
  };

  // Method for switching the state of the modal window
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, // Inverts the value of showModal
    }));
  };
  render() {
    // Get the current value of showModal from the state
    const { showModal } = this.state;

    // Get the passed props image
    const { image } = this.props;
    return (
      <>
        <Item>
          <Img
            src={image.webformatURL} //URL of the small image
            alt={image.tags} //Image Tags
            onClick={this.toggleModal} //Click handler for opening a modal window
          />
          {showModal && ( //If showModal is true, display the modal window
            <Modal
              largeImageURL={image.largeImageURL} //URL of a large image
              tags={image.tags} //Image Tags
              onClose={this.toggleModal} //Handler for closing a modal window
            />
          )}
        </Item>
      </>
    );
  }
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;
