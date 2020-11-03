import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalProvider } from './store/Global/GlobalState';
import Routes from './store/routes';
import 'antd/dist/antd.css'
import './styles/css/style.css'
// import axios from 'axios';

import Header from './components/Header';

import { AuthProvider } from './store/Auth/AuthState';
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {

  return (
    <Router>
      <GlobalProvider>
        <AuthProvider>
          <div className="App">
            {/* <Header /> */}
            <Routes />
            {/* <Footer /> */}
          </div>

        </AuthProvider>
      </GlobalProvider>
    </Router>
  );
}

export default App;
