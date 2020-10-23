import React, { FunctionComponent } from 'react'
import { Experience } from '../types/brick-types'

const ResultItem:FunctionComponent<Experience> = ({
  name,
  description,
  category,
  price
}:Experience):JSX.Element => {
  return (
    <div>
      one item in the results box
      <p>name: {name}</p>
      <p>description: {description}</p>
      <p>category: {category}</p>
      <p>price: {price.currency}{price.amount}</p>
    </div>
  )
}

export default ResultItem
