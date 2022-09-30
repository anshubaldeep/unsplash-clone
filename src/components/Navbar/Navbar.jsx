/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Navbar.module.css';
import UnsplashLogo from '../../icons/UnsplashLogo';
import { Button } from '@mui/material';
import Searchbar from '../SearchBar';

const Navbar = ({ handleSubmit, searchValue, setSearchValue }) => {
  const [openNav, setOpenNav] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    setOpenNav(!openNav);
  };
  return (
    <>
      <header className={classes.mainHeader}>
        <a href="index.html" className={classes.brandLogo}>
          <div className={classes.brandLogoName} onClick={() => history.push('/')}>
            <UnsplashLogo />
          </div>
        </a>
        <div className={classes.navSearchBar}>
          <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} handleSubmit={handleSubmit} />
        </div>
        <div href="#" className={classes.toggleButton} onClick={handleClick}>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
        </div>
        <div className={classes.navShadow}>
          <nav className={classes.mainNav}>
            <ul className={openNav ? classes.active : classes.inactive}>
              <li><a>Advertise</a></li>
              <li><a>Blog</a></li>
              <li>
                <Button variant="outlined" size="medium" onClick={() => {}}>
                  Submit
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
