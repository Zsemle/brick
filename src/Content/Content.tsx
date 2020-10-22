import React, { FunctionComponent } from 'react'

const Content:FunctionComponent = (props) => {
  return (
    <main>
      {props.children}
    </main>
  )
}

export default Content
