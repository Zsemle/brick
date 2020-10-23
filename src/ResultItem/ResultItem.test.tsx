import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import ResultItem, { ResultItemProps } from './ResultItem'

describe('the result item component', () => {
  it('renders the component', () => {
    const props:ResultItemProps = {
      name: 'test experience',
      description: 'description of the experience',
      category: 'brain games',
      price: 45667788
    }

    const wrapper:ShallowWrapper = shallow(<ResultItem {...props}/>)
    expect(wrapper).toMatchSnapshot()
  })
})
