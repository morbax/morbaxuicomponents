// Core
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Intro
import App from './app';

// Styles
import './theme/init.css';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,
    document.getElementById('app')
);
