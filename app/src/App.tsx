import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalProvider } from './store/Global/GlobalState';
import Routes from './store/routes';

import Header from './components/Header';

import GlobalStyle from './styles/global';
import { AuthProvider } from './store/Auth/AuthState';

function App() {

  return (
    <Router>
      <GlobalProvider>
        <AuthProvider>
          <div className="App">
            <Header />
            <Routes />
            {/* <Footer /> */}
          </div>

          <GlobalStyle />
        </AuthProvider>
      </GlobalProvider>
    </Router>
  );
}

export default App;
