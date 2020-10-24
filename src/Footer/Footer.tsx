import React, { FunctionComponent } from 'react'
import './Footer.scss'

const T:any = {
  footerText: 'This is the footer of the application'
}

const Footer:FunctionComponent = ():JSX.Element => {
  return (
    <footer className="footer">
      <p>{T.footerText}</p>
    </footer>
  )
}

export default Footer
