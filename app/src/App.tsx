import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';

import Header from './components/Header';

import GlobalStyle from './styles/global';

function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        <div className="App">
          <Header />
          {/* <Footer /> */}
        </div>

        <GlobalStyle />
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
