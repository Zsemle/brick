import React from 'react'
import Filter from '../Filter/Filter'
import Results from '../Results/Results'
import experiences from '../mocks/experiences'
import { Experience } from '../types/brick-types'
import './FilterPage.scss'

interface FilterPageState{
  filteredExperiences: Experience[]
}

class FilterPage extends React.Component<{}, FilterPageState> {
  state = {
    filteredExperiences: experiences
  }

  constructor (props:any) {
    super(props)
    this.updateFilteredExperiences = this.updateFilteredExperiences.bind(this)
    this.resetExperiences = this.resetExperiences.bind(this)
  }

  private updateFilteredExperiences (filteredExperiences:Experience[]):void {
    this.setState({
      filteredExperiences: filteredExperiences
    })
  }

  private resetExperiences ():void {
    this.setState({
      filteredExperiences: experiences
    })
  }

  render ():JSX.Element {
    const { filteredExperiences } = this.state
    const {
      updateFilteredExperiences,
      resetExperiences
    } = this

    return (
      <div className="filter-page">
        <Filter
          experiences={experiences}
          updateExperiences={updateFilteredExperiences}
          filterCleared={resetExperiences}
        />
        <Results experiences = {filteredExperiences}/>
      </div>
    )
  }
}

export default FilterPage
