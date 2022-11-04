import React, { useContext, useState } from 'react';
import { Button, Container, Form, Image, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, withoutSearch }) {
  const history = useHistory();
  const [isSearchInputShown, toggleSearchInput] = useState(false);
  const { handleChange } = useContext(MyContext);

  return (
    <Navbar fixed="top" className="nav-bar">
      <Container fluid>
        <Button
          data-testid="profile-top-btn"
          type="button"
          src={ profileIcon }
          onClick={ () => history.push('/profile') }
          variant="warning"
          size="sm"
        >
          <Image fluid src={ profileIcon } alt="profile-icon" />
        </Button>
        <Navbar.Brand>
          <h1 className="h1 fw-bold" data-testid="page-title">
            {title}
          </h1>
        </Navbar.Brand>
        <div>
          <Form className="d-flex">
            {isSearchInputShown && (
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Pesquise aqui"
                  data-testid="search-input"
                  name="searchInput"
                  onChange={ handleChange }
                  size="sm"
                />
              </Form.Group>
            )}
            {!withoutSearch && (
              <Button
                data-testid="search-top-btn"
                type="button"
                src={ searchIcon }
                onClick={ () => toggleSearchInput(!isSearchInputShown) }
                variant="warning"
                size="sm"
              >
                <Image fluid src={ searchIcon } alt="search-icon" />
              </Button>
            )}
          </Form>
        </div>
      </Container>
    </Navbar>
  );
}

// Header.propTypes = {
//   title: PropTypes.string,
//   withoutSearch: PropTypes.bool,
// }.isRequired;

export default Header;
