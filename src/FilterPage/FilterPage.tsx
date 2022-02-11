import React from 'react'
import Filter from '../Filter/Filter'
import Results from '../Results/Results'
import Axios, { AxiosError, AxiosResponse } from 'axios'
import { Experience } from '../types/brick-types'
import './FilterPage.scss'

interface FilterPageState{
  filteredExperiences: Experience[] | null
  experiences: Experience[] | null
  error: Error | AxiosError |null
}

class FilterPage extends React.Component<{}, FilterPageState> {
  state = {
    filteredExperiences: null,
    experiences: null,
    error: null
  }

  constructor (props:any) {
    super(props)
    this.updateFilteredExperiences = this.updateFilteredExperiences.bind(this)
    this.resetExperiences = this.resetExperiences.bind(this)
    this.fetchExperiences = this.fetchExperiences.bind(this)
  }

  componentDidMount ():void {
    this.fetchExperiences()
  }

  private updateFilteredExperiences (filteredExperiences:Experience[] | null):void {
    this.setState({
      filteredExperiences: filteredExperiences
    })
  }

  private fetchExperiences (): void {
    Axios.get('http://localhost:3001/experiences')
      .then(
        (response:AxiosResponse) => {
          const experiences = response.data.map((experiencesData:any) => new Experience(experiencesData))
          this.setState({
            experiences,
            filteredExperiences: experiences
          })
        },
        (error) => {
          this.setState({
            error
          })
        }
      )
  }

  private resetExperiences ():void {
    this.setState({
      filteredExperiences: this.state.experiences
    })
  }

  render ():JSX.Element {
    const { filteredExperiences, experiences } = this.state
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
