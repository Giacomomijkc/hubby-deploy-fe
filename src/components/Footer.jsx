import React from 'react';
import logoImage from '../assets/logo.png';
import './Footer.css';

const Footer = () => {


    return(
        <div className=' d-flex justify-content-center align-items-center footer'>
            <div className='m-0 p-0'>
                <p className='p-footer'>Designed for Designers</p>
            </div>
            <div className='vertical-aling-middle'>
                <img src={logoImage} alt="logo" className='logo' />
            </div>
        </div>
    );
};

export default Footer;