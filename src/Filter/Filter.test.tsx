import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import Filter from './Filter'

describe('the filter component', () => {
  it('renders the component', () => {
    const wrapper:ShallowWrapper = shallow(<Filter/>)
    expect(wrapper).toMatchSnapshot()
  })
})
