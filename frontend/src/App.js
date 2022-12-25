import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ScrapPage from './pages/ScrapPage';
import NewsCardDetail from './components/NewsCardDetail';

function App() {
  return (
    <div className="App"> 
   
      <BrowserRouter>
      <NavBar/>
          <div className='pages'>
              <Routes>
                  <Route
                    path='/'
                    element={<Home/>}
                  />
                  <Route
                    path='/scrap'
                    element={<ScrapPage/>}
                  />
                  <Route
                  path='/news/:id'
                  element={<NewsCardDetail/>}
                  />
              </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
