import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import Results, { ResultsProps } from './Results'

describe('the results component', () => {
  it('renders the component', () => {
    const props:ResultsProps = {
      experiences: [
        {
          name: 'test experience 1',
          description: 'description of the experience',
          category: 'brain games',
          price: {
            amount: 234,
            currency: 'USD'
          }
        },
        {
          name: 'test experience 2',
          description: 'description of the second experience',
          category: 'brain games',
          price: {
            amount: 222222,
            currency: 'GBP'
          }
        }
      ]
    }

    const wrapper:ShallowWrapper = shallow(<Results {...props}/>)
    expect(wrapper).toMatchSnapshot()
  })
})
