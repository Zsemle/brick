import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import FilterPage from './FilterPage'

describe('the filter page component', () => {
  it('renders the component', () => {
    const wrapper:ShallowWrapper = shallow(<FilterPage/>)
    expect(wrapper).toMatchSnapshot()
  })
})
