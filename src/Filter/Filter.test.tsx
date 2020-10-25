import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import Filter, { FilterProps } from './Filter'
import experiences from '../mocks/experiences'

describe('the filter component', () => {
  const props:FilterProps = {
    experiences: experiences,
    updateExperiences: jest.fn(),
    filterCleared: jest.fn()
  }
  const wrapper:ShallowWrapper = shallow(<Filter{...props}/>)

  it('renders the component', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
