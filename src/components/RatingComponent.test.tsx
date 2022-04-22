
import { RatingComp } from './RatingComponent';
import Enzyme, { shallow, mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


const TestData = {
  id: '1',
  totalRateValue: 5, 
  timesRated: 1
}
const TestData2 = {
  id: '1',
  totalRateValue: 1, 
  timesRated: 1
}

describe('RatingComponent', () => {

  test('should render component without errors', () => {
    render(<RatingComp id={TestData.id} totalRateValue={TestData.totalRateValue} timesRated={TestData.timesRated}/>)
  })

  test('should display rating value', () => {
    const wrapper = mount(<RatingComp id={TestData.id} totalRateValue={TestData.totalRateValue} timesRated={TestData.timesRated}/>)
    const radioInput = wrapper.find('[data-testid="rating-5"]')
    expect(radioInput.exists()).toBeTruthy()
    expect(radioInput.prop("value")).toEqual(5)
  })

  test('should update rating value on click', () => {
    const wrapper = mount(<RatingComp id={TestData2.id} totalRateValue={TestData2.totalRateValue} timesRated={TestData2.timesRated}/>)
    const ratingDisplay = wrapper.find('span')    
    expect(ratingDisplay.text()).toBe('(1)')//första värdet
    const radioInputClicked = wrapper.find('input').at(2)
    radioInputClicked.simulate('click')
    expect(ratingDisplay.text()).toBe('(4)')//nytt värde
  })

})