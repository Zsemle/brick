import React, { FunctionComponent } from 'react'
import ResultItem from '../ResultItem/ResultItem'
import { Experience } from '../types/brick-types'
import './Results.scss'

export interface ResultsProps {
  experiences: Experience[] | null
}

const T:any = {
  noResults: 'No results match your criteria. Try changing the filter options.'
}

const Results:FunctionComponent<ResultsProps> = ({ experiences }:ResultsProps):JSX.Element => {
  if (experiences && experiences.length > 0) {
    return (
      <ul className="results">
        {experiences?.map((experience, key) => <ResultItem
          name={experience.name}
          description={experience.description}
          category={experience.category}
          price={experience.price}
          key={experience.name + key}
        />)}
      </ul>
    )
  }
  return <p>{T.noResults}</p>
}

export default Results
