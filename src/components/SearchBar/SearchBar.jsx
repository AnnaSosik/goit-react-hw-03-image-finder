import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
  SearchLogo,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    searchName: '', // Stores the value of the entered search query


    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault(); 
    const searchQuery = event.target.elements.searchName.value.trim(); // Get the entered search query and remove spaces


    this.props.onSubmit(searchQuery);  // Pass the entered search query to the parent component


    event.target.reset(); // Reset the value in the input field after submitting the form


  };

  render() {
    return (
      <header>
        <SearchForm onSubmit={this.handleSubmit}>
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
            <SearchLogo
              src={require('./pixabay-logo.png')} 
              width="200"
            />
          </a>
          <SearchButton>
            <BsSearch />
            <SearchSpan>Search</SearchSpan>
          </SearchButton>
          <SearchInput
            name="searchName"
            type="text"
            id="search"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;