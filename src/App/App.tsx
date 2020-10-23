import React from 'react'
import './App.css'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Content from '../Content/Content'
import FilterPage from '../FilterPage/FilterPage'

const App:React.FunctionComponent = function ():JSX.Element {
  return (
    <div>
      <Header/>
      <Content>
        <FilterPage/>
      </Content>
      <Footer/>
    </div>
  )
}

export default App
