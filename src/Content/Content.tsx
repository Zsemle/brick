import React, { FunctionComponent } from 'react'
import './Content.scss'

interface ContentProps {
  children?: React.ReactNode
}

const Content:FunctionComponent = ({ children }:ContentProps):JSX.Element => {
  return (
    <main className="content">
      {children}
    </main>
  )
}

export default Content
