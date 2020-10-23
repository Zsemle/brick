import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import Results from './Results'

describe('the results component', () => {
  it('renders the component', () => {
    const wrapper:ShallowWrapper = shallow(<Results/>)
    expect(wrapper).toMatchSnapshot()
  })
})
