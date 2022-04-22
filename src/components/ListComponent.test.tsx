import { ListComponent } from './ListComponent';
import Enzyme, { shallow, mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { data } from '../data/data'

Enzyme.configure({ adapter: new Adapter() });

describe('ListComponent', () => {

  const testingProp = [
    {
      id: '1',
      name: 'Malin',
      description: 'Det här är ett hittepå event',
      time:'19:40',
      date:'2023-01-29',
      attendences: 5,
      maxParticipants: 10,
      totalRateValue: 10,
      timesRated: 2,
      image: 'https://m.media-amazon.com/images/M/MV5BZTBmNGUyYjctMjcxZC00OWM1LTllY2YtODMxYzBmZjRjYzViXkEyXkFqcGdeQXVyODEyMzI2OTE@._V1_.jpg',
      comments:[]
    },
    {
      id: '2',
      name: 'Bowlingafton',
      description: 'Härlig bowlingkväll med goagubbar',
      time:'19:40',
      date:'2023-05-23',
      attendences: 5,
      maxParticipants: 10,
      totalRateValue: 9,
      timesRated: 3,
      image: 'https://m.media-amazon.com/images/M/MV5BZTBmNGUyYjctMjcxZC00OWM1LTllY2YtODMxYzBmZjRjYzViXkEyXkFqcGdeQXVyODEyMzI2OTE@._V1_.jpg',
      comments:[]
    },
    {
      id: '3',
      name: 'Bokklubb',
      description: 'Djupa tankar och samtal kring böcker',
      time:'12:20',
      date:'2023-01-01',
      attendences: 5,
      maxParticipants: 10,
      totalRateValue: 8,
      timesRated: 2,
      image: 'https://y.yarn.co/792a08d8-23a8-4d9f-b711-a81160b86571_screenshot.jpg',
      comments:['kalle', 'hej']
    }
  ]

  test('should render ListComponent without errors', () => {
    render(<ListComponent data={data} />)
  })

  test('should render 3 eventcard components', () => {
    const wrapper = shallow(<ListComponent data={testingProp} />);
    expect(wrapper.find('EventCardComp').length).toBe(3)
  })

  test('should sort events by date, default desc', () => {
    const wrapper = shallow(<ListComponent data={testingProp} />)
    const firstEventId = Object.values(wrapper.find('EventCardComp').first().prop('event'))[0]
    expect(firstEventId).toBe('2')
  })

  test('should sort event by date asc on click', () => {
    const wrapper = shallow(<ListComponent data={testingProp} />)
    wrapper.find('button').simulate('click')
    const firstEventId = Object.values(wrapper.find('EventCardComp').first().prop('event'))[0]
    expect(firstEventId).toBe('3')
  })

  test('should change btn text on click event', () => {
    const wrapper = shallow(<ListComponent data={data} />);
    expect(wrapper.find('button').text()).toBe('Sort by date asc')
    wrapper.find('button').simulate('click')
    expect(wrapper.find('button').text()).toBe('Sort by date desc')
  });

})