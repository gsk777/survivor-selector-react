import React from 'react';
import Home from './Home';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Home /></BrowserRouter>, div);
})