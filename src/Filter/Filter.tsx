import React, { SyntheticEvent } from 'react'
import { Experience, ExperienceCategory } from '../types/brick-types'
import './Filter.scss'
import classNames from 'classnames'

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
  filterToggleText: 'Toggle Filter',
  categoryFilterTitle: 'Filter by category',
  textFilterTitle: 'Search:',
  priceFilterTitle: 'Filter by Price',
  minPrice: 'min.',
  maxPrice: 'max.'
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
  constructor (props:FilterProps) {
    super(props)
    const maxPrice = Math.max(...this.props.experiences.map(experience => experience.price.amount))
    this.state = {
      isOpen: false,
      filterText: '',
      filterPriceMin: 0,
      filterPriceMax: maxPrice,
      filterCategories: [],
      categoriesByText: this.props.experiences,
      categoriesByPrice: this.props.experiences,
      categoriesByCategory: this.props.experiences,
      applyTextFilter: false,
      applyPriceFilter: false,
      applyCategoryFilter: false
    }

    this.onInputTextChange = this.onInputTextChange.bind(this)
    this.onInputCheckboxChange = this.onInputCheckboxChange.bind(this)
    this.onInputPriceMinChange = this.onInputPriceMinChange.bind(this)
    this.onInputPriceMaxChange = this.onInputPriceMaxChange.bind(this)
    this.compoundFilters = this.compoundFilters.bind(this)
    this.toggleFilterContent = this.toggleFilterContent.bind(this)
  }

  private toggleFilterContent ():void {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
  }

  private onInputTextChange (e:SyntheticEvent):void{
    e.persist()
    this.setState(
      {
        filterText: (e.target as HTMLInputElement).value
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
      categoriesByCategory: filterCategories.length > 0 ? result : experiences
    }, this.compoundFilters)
  }

  private filterByText ():void {
    const { filterText } = this.state
    const { experiences } = this.props
    const result = experiences.filter(
      (experience) => experience.name.toLowerCase().includes(filterText.toLowerCase())
    )
    const applyTextFilter:boolean = filterText.length > 0
    this.setState({
      categoriesByText: result,
      applyTextFilter: applyTextFilter
    }, this.compoundFilters)
  }

  private compoundFilters ():void {
    const {
      experiences,
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
    let result:Experience[] = experiences
    if (applyTextFilter) {
      result = categoriesByText
    }
    if (applyPriceFilter) {
      result = result.filter(experience => categoriesByPrice.includes(experience))
    }
    if (applyCategoryFilter) {
      result = result.filter(experience => categoriesByCategory.includes(experience))
    }
    if (!applyTextFilter && !applyPriceFilter && !applyCategoryFilter) {
      filterCleared()
      return
    }
    updateExperiences(result)
  }

  render ():JSX.Element {
    const { isOpen } = this.state
    const filterContentClasses:string = classNames('filter__content', { 'filter__content--visible': isOpen })
    return (
      <div className="filter">
        <button className="filter__toggle-button" onClick={this.toggleFilterContent}>{T.filterToggleText}</button>
        <div className={filterContentClasses}>
          <label className="filter__text-label" htmlFor="searchField">{T.textFilterTitle}</label>
          <input className="filter__text-input" id="searchField" type="search" value={this.state.filterText} onChange={this.onInputTextChange}/>
          <fieldset>
            <legend>{T.categoryFilterTitle}</legend>
            {Object.keys(categories).map((category, index) => (
              <label className="filter__check-category" key={`${category}${index}`}>
                <input type="checkbox" onChange={this.onInputCheckboxChange} value={category}/>
                <span>{category}</span>
              </label>
            )
            )
            }
          </fieldset>
          <fieldset className="filter__price-field">
            <legend>{T.priceFilterTitle}</legend>
            <label className="filter__text-label" htmlFor="minPrice">{T.minPrice}</label>
            <input className="filter__text-input" id="minPrice" min="0" type="number" value={this.state.filterPriceMin} onChange={this.onInputPriceMinChange}/>
            <label className="filter__text-label" htmlFor="maxPrice">{T.maxPrice}</label>
            <input className="filter__text-input" id="maxPrice" min="0" type="number" value={this.state.filterPriceMax} onChange={this.onInputPriceMaxChange}/>
          </fieldset>
        </div>
      </div>
    )
  }
}

export default Filter
