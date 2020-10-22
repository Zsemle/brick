import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import Content from './Content'

describe('the content component', () => {
  it('renders the component', () => {
    const wrapper:ShallowWrapper = shallow(<Content />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the component with it\'s children', () => {
    const wrapper:ShallowWrapper = shallow(
      <Content>
        <div>{'test content 1'}</div>
        <div>{'test content 2'}</div>
      </Content>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
