import { shallow, ShallowWrapper } from 'enzyme'
import React from 'react'
import FilterPage from './FilterPage'
import axios from 'axios'
import experiences from '../mocks/experiences'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('the filter page component', () => {
  it('renders the component', async () => {
    const response = {
      data: experiences
    }
    mockedAxios.get.mockImplementation(() => Promise.resolve(response))
    const wrapper:ShallowWrapper = shallow(<FilterPage/>)

    await expect(mockedAxios.get).toHaveBeenCalled()
    expect(wrapper).toMatchSnapshot()
  })
})
