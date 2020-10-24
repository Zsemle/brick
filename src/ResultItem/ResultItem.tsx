import React, { FunctionComponent } from 'react'
import { Experience } from '../types/brick-types'
import './ResultItem.scss'

const T:any = {
  name: 'Name:',
  description: 'Description:',
  category: 'Category:',
  price: 'Price:'
}

const ResultItem:FunctionComponent<Experience> = ({
  name,
  description,
  category,
  price
}:Experience):JSX.Element => {
  return (
    <li className="result-item">
      <p>{T.name}{name}</p>
      <p>{T.description}{description}</p>
      <p>{T.category}{category}</p>
      <p>{T.price}{price.currency}{price.amount}</p>
    </li>
  )
}

export default ResultItem
