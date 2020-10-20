import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders the app', () => {
    const wrapper:ShallowWrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
