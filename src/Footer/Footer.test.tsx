import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Footer from './Footer';

describe('the footer component', () => {
  it('renders the component', () => {
    const wrapper:ShallowWrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });

});
