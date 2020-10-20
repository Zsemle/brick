import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Header from './Header';

describe('<Header />', () => {
  it('renders the component', () => {
    const wrapper:ShallowWrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

});
