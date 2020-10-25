import React, { SyntheticEvent } from 'react'
import { Experience, ExperienceCategory } from '../types/brick-types'

interface FilterProps{
  experiences: Experience[]
  updateExperiences: (experiences:Experience[]) => void
  filterCleared: () => void
}

interface FilterState{
  isOpen: boolean
  filterText: string
}

const T:any = {
  filterToggleText: 'Filter',
  categoryFilterTitle: 'Filter by category'
}

const categories:Categories = {
  animals: 'animals',
  sports: 'sports',
  'brain games': 'brain games'
}

type Categories = {
  // eslint-disable-next-line no-unused-vars
  [thing in ExperienceCategory]: ExperienceCategory
};

class Filter extends React.Component<FilterProps, FilterState> {
  constructor (props:any) {
    super(props)

    this.state = {
      isOpen: false,
      filterText: ''
    }

    this.onInputTextChange = this.onInputTextChange.bind(this)
  }

  private onInputTextChange (e:SyntheticEvent):void{
    e.persist()
    const inputValue:string = (e.target as HTMLInputElement).value
    this.setState({ filterText: inputValue }, this.filterByText)
  }

  private filterByText ():void {
    const { filterText } = this.state
    const { experiences } = this.props
    const result = experiences.filter(
      (experience) => experience.name.toLowerCase().includes(filterText.toLowerCase())
    )

    console.log(result)
  }

  render () {
    return (
      <div>
        <button>{T.filterToggleText}</button>
        <input type="search" value={this.state.filterText} onChange={this.onInputTextChange}/>
        <fieldset>
          <legend>{T.categoryFilterTitle}</legend>
          {Object.keys(categories).map((category, index) => (
            <label key={`${category}${index}`}>
              <input type="checkbox"/>
              <span>{category}</span>
            </label>
          )
          )
          }
        </fieldset>
      </div>
    )
  }
}

export default Filter
