import React, { FunctionComponent } from 'react'
import './Header.scss'

const T:any = {
  headerText: 'Brick experiences'
}

const Header:FunctionComponent = ():JSX.Element => {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <h1 className="header__title">{T.headerText}</h1>
      <div className="header__main-menu"></div>
    </header>
  )
}

export default Header
