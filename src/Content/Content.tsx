import React, { FunctionComponent } from 'react'

interface ContentProps {
  children?: React.ReactNode
}

const Content:FunctionComponent = ({ children }:ContentProps):JSX.Element => {
  return (
    <main>
      {children}
    </main>
  )
}

export default Content
