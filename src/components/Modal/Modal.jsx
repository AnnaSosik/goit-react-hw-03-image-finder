import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');



class Modal extends Component {
 
    // Lifecycle method: called after mounting the component
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
  
     // Lifecycle method: called before unmounting the component
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown); 
      document.body.style.overflow = 'visible';
    }
  
    // Key press event handler
    handleKeyDown = event => {
      if (event.code === 'Escape') {
        this.props.onClose(); 
      }
    };
  
     // Handler for clicking on the modal window background
    handleBackdropClick = event => {
      if (event.currentTarget === event.target) {
        this.props.onClose(); 
      }
    };
  
    render() {
      const { largeImageURL, tags } = this.props; // Getting the values of props


  
      return createPortal(
        <Overlay onClick={this.handleBackdropClick}>
          <ModalWindow>
            <img src={largeImageURL} alt={tags} />
          </ModalWindow>
        </Overlay>,
        modalRoot //Rendering a modal window into a modalRoot object in a DOM tree


      );
    }
  }
  
  Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  export default Modal;