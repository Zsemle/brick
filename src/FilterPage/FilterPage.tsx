import React, { FunctionComponent } from 'react'
import Filter from '../Filter/Filter'
import Results from '../Results/Results'

const FilterPage:FunctionComponent = ():JSX.Element => {
  return (
    <div>
      <Filter/>
      <Results/>
    </div>
  )
}

export default FilterPage
