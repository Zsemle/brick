import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Footer from './Footer';

describe('<Footer />', () => {
  it('renders the component', () => {
    const wrapper:ShallowWrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });

});
