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
      <h3 className="result-item__title">{name}</h3>
      <p className="result-item__paragraph">{description}</p>
      <p className="result-item__paragraph">{`${T.category} ${category}`}</p>
      <p className="result-item__price">{`${T.price} ${price.currency} ${price.amount}`}</p>
    </li>
  )
}

export default ResultItem
