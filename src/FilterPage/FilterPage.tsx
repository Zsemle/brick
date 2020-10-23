import React, { FunctionComponent } from 'react'
import Filter from '../Filter/Filter'
import Results from '../Results/Results'
import experiences from '../mocks/experiences'

const FilterPage:FunctionComponent = ():JSX.Element => {
  return (
    <div>
      <Filter/>
      <Results experiences = {experiences}/>
    </div>
  )
}

export default FilterPage
