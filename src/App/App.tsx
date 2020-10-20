import React from 'react';
import './App.css';
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Content from '../Content/Content'

const App:React.FunctionComponent = function() {
  return (
    <div>
      <Footer/>
      <Content>
        {"content goes here"}
      </Content>
      <Header/>
    </div>
  );
}

export default App;
