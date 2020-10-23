import React, { FunctionComponent } from 'react'
import ResultItem from '../ResultItem/ResultItem'

const Results:FunctionComponent = ():JSX.Element => {
  return (
    <div>
      <div>Results of the filter page goes here</div>
      <ResultItem
        name={'experience'}
        category={'animals'}
        description={'description'}
        price={123456}
      />
    </div>
  )
}

export default Results
