import React from 'react';
import {HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Main from './pages/Main';
import Login from './pages/Login/login';
import Administrar from './pages/Administrar/administrar';

function HtmlRoutes(){
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="login" element={<Login />} />
                <Route path="administrar" element = {<Administrar />} />
            </Routes>
        </HashRouter>
    );
}

export default HtmlRoutes;
