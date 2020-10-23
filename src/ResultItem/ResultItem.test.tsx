import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import ResultItem from './ResultItem'
import { Experience } from '../types/brick-types'

describe('the result item component', () => {
  it('renders the component', () => {
    const props:Experience = {
      name: 'test experience',
      description: 'description of the experience',
      category: 'brain games',
      price: {
        amount: 234,
        currency: 'USD'
      }
    }

    const wrapper:ShallowWrapper = shallow(<ResultItem {...props}/>)
    expect(wrapper).toMatchSnapshot()
  })
})
