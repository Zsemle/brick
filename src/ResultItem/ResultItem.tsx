import React, { FunctionComponent } from 'react'

type ExperienceCategory = 'animals'| 'sports' | 'brain games'

export interface ResultItemProps {
    name: string
    description: string
    category: ExperienceCategory
    price: number
}

const ResultItem:FunctionComponent<ResultItemProps> = ({
  name,
  description,
  category,
  price
}:ResultItemProps):JSX.Element => {
  return (
    <div>
      one item in the results box
      <p>name: {name}</p>
      <p>description: {description}</p>
      <p>category: {category}</p>
      <p>price: {price}</p>
    </div>
  )
}

export default ResultItem
