import React, { SyntheticEvent } from 'react'
import { Experience, ExperienceCategory } from '../types/brick-types'

export interface FilterProps{
  experiences: Experience[]
  updateExperiences: (experiences:Experience[]) => void
  filterCleared: () => void
}

interface FilterState{
  isOpen: boolean
  applyTextFilter: boolean
  applyPriceFilter: boolean
  applyCategoryFilter: boolean
  filterText: string
  filterCategories: ExperienceCategory[]
  filterPriceMin: number
  filterPriceMax: number
  categoriesByText: Experience[]
  categoriesByPrice: Experience[]
  categoriesByCategory: Experience[]
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
    const maxPrice = Math.max(...this.props.experiences.map(experience => experience.price.amount))
    this.state = {
      isOpen: false,
      filterText: '',
      filterPriceMin: 0,
      filterPriceMax: maxPrice,
      filterCategories: [],
      categoriesByText: [],
      categoriesByPrice: [],
      categoriesByCategory: [],
      applyTextFilter: false,
      applyPriceFilter: false,
      applyCategoryFilter: false
    }

    this.onInputTextChange = this.onInputTextChange.bind(this)
    this.onInputCheckboxChange = this.onInputCheckboxChange.bind(this)
    this.onInputPriceMinChange = this.onInputPriceMinChange.bind(this)
    this.onInputPriceMaxChange = this.onInputPriceMaxChange.bind(this)
    this.compoundFilters = this.compoundFilters.bind(this)
  }

  private onInputTextChange (e:SyntheticEvent):void{
    e.persist()
    this.setState(
      {
        filterText: (e.target as HTMLInputElement).value,
        applyTextFilter: (e.target as HTMLInputElement).value.length > 0
      },
      this.filterByText
    )
  }

  private onInputCheckboxChange (e:SyntheticEvent):void{
    e.persist()
    this.toggleFilterCategory(
      (e.target as HTMLInputElement).value as ExperienceCategory
    )
  }

  private onInputPriceMinChange (e:SyntheticEvent):void{
    e.persist()
    const newPriceLimit:number = (e.target as HTMLInputElement).value.length > 0 ? parseInt((e.target as HTMLInputElement).value) : 0
    this.setState(
      {
        filterPriceMin: newPriceLimit,
        applyPriceFilter: true
      },
      this.filterByPrice
    )
  }

  private onInputPriceMaxChange (e:SyntheticEvent):void{
    e.persist()
    const newPriceLimit:number = (e.target as HTMLInputElement).value.length > 0 ? parseInt((e.target as HTMLInputElement).value) : 0
    this.setState(
      {
        filterPriceMax: newPriceLimit,
        applyPriceFilter: true
      },
      this.filterByPrice
    )
  }

  private filterByPrice ():void{
    const {
      experiences
    } = this.props
    const {
      filterPriceMin,
      filterPriceMax
    } = this.state
    const filteredCategories:Experience[] = experiences.filter(
      experience => experience.price.amount >= filterPriceMin && experience.price.amount <= filterPriceMax
    )
    this.setState({
      categoriesByPrice: filteredCategories
    }, this.compoundFilters)
  }

  private toggleFilterCategory (category:ExperienceCategory):void{
    const { filterCategories } = this.state
    let newFilterCategories:ExperienceCategory[] = [...filterCategories]
    if (newFilterCategories.includes(category)) {
      newFilterCategories = newFilterCategories.filter(item => item !== category)
    } else {
      newFilterCategories.push(category)
    }
    this.setState({
      filterCategories: newFilterCategories,
      applyCategoryFilter: newFilterCategories.length > 0
    }, this.filterByCategories
    )
  }

  private filterByCategories ():void {
    const { filterCategories } = this.state
    const {
      experiences
    } = this.props
    const result = experiences.filter(
      (experience) => filterCategories.includes(experience.category)
    )
    this.setState({
      categoriesByCategory: result
    }, this.compoundFilters)
  }

  private filterByText ():void {
    const { filterText } = this.state
    const { experiences } = this.props
    const result = experiences.filter(
      (experience) => experience.name.toLowerCase().includes(filterText.toLowerCase())
    )
    this.setState({
      categoriesByText: result
    }, this.compoundFilters)
  }

  private compoundFilters ():void {
    const {
      updateExperiences,
      filterCleared
    } = this.props
    const {
      categoriesByText,
      categoriesByPrice,
      categoriesByCategory,
      applyTextFilter,
      applyPriceFilter,
      applyCategoryFilter
    } = this.state
    let result:Experience[] = []
    if (applyTextFilter && !applyPriceFilter && !applyCategoryFilter) {
      result = categoriesByText
    }
    if (!applyTextFilter && applyPriceFilter && !applyCategoryFilter) {
      result = categoriesByPrice
    }
    if (!applyTextFilter && !applyPriceFilter && applyCategoryFilter) {
      result = categoriesByCategory
    }
    if (applyTextFilter && applyPriceFilter && !applyCategoryFilter) {
      result = categoriesByText.filter(experience => categoriesByPrice.includes(experience))
    }
    if (applyTextFilter && !applyPriceFilter && applyCategoryFilter) {
      result = categoriesByText.filter(experience => categoriesByCategory.includes(experience))
    }
    if (!applyTextFilter && applyPriceFilter && applyCategoryFilter) {
      result = categoriesByPrice.filter(experience => categoriesByCategory.includes(experience))
    }
    if (applyTextFilter && applyPriceFilter && applyCategoryFilter) {
      const firstIntersection:Experience[] = categoriesByText.filter(experience => categoriesByPrice.includes(experience))
      result = firstIntersection.filter(experience => categoriesByCategory.includes(experience))
    }
    if (!applyTextFilter && !applyPriceFilter && !applyCategoryFilter) {
      filterCleared()
      return
    }
    updateExperiences(result)
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
              <input type="checkbox" onChange={this.onInputCheckboxChange} value={category}/>
              <span>{category}</span>
            </label>
          )
          )
          }
        </fieldset>
        <input min="0" type="number" value={this.state.filterPriceMin} onChange={this.onInputPriceMinChange}/>
        <input min="0" type="number" value={this.state.filterPriceMax} onChange={this.onInputPriceMaxChange}/>
      </div>
    )
  }
}

export default Filter
