import React, { FunctionComponent } from 'react'
import ResultItem from '../ResultItem/ResultItem'
import { Experience } from '../types/brick-types'

export interface ResultsProps {
  experiences: Experience[]
}

const Results:FunctionComponent<ResultsProps> = ({ experiences }:ResultsProps):JSX.Element => {
  return (
    <ul>
      {experiences.map((experience, key) => <ResultItem
        name={experience.name}
        description={experience.description}
        category={experience.category}
        price={experience.price}
        key={experience.name + key}
      />)}
    </ul>
  )
}

export default Results
