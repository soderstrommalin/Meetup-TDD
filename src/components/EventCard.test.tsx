
import { EventCardComp } from './EventCard';
import Enzyme, { shallow, mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Event } from '../model/event'

Enzyme.configure({ adapter: new Adapter() });

const testData: Event = {
      id: '7',
      name: 'Train your pet zombie',
      description: 'Because they are part of our families',
      time: '19:40',
      date: '2023-12-24',
      attendences: 1,
      maxParticipants: 5,
      totalRateValue: 10,
      timesRated: 2,
      image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Photo/_new/111028-walkingdead-biz.jpg',
      comments: []
    }

const testData2: Event = {
      id: '7',
      name: 'Train your pet zombie',
      description: 'Because they are part of our families',
      time: '19:40',
      date: '2023-12-24',
      attendences: 5,
      maxParticipants: 5,
      totalRateValue: 8,
      timesRated: 2,
      image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/MSNBC/Components/Photo/_new/111028-walkingdead-biz.jpg',
      comments: ["hallå", "hej"]
    }

describe('EventCard-component', () => {
  test('should render EventCardComp without errors', () => {
    render(<EventCardComp event={testData} />)
  })

  test('should render a Event with the given props', () => {
    render(<EventCardComp event={testData} />)
    screen.queryAllByText(testData.name, { exact: false })
    screen.queryAllByText(testData.description, { exact: false })
    screen.getByText(testData.time, { exact: false })
    screen.getByText(testData.date, { exact: false })
  })

  test('should display how many spots an event has', () => {
    const wrapper = mount(<EventCardComp event={testData} />)
    const displayedSpots = wrapper.find('.overlayAttend')
    expect(displayedSpots.text()).toBe('Participants: 1 / 5')
  })

  test('renders comment input with placeholder text initially', () => {
    const wrapper = mount(<EventCardComp event={testData} />)
    const cardInput = wrapper.find('.overlayInput')
    expect(cardInput.exists()).toBe(true)
    expect(cardInput.prop('placeholder')).toMatch('Add a comment...')
  });

  test(('should render a join button when able to attend'), () => {
    const wrapper = mount(<EventCardComp event={testData} />)
    const joinBtn = wrapper.find('button')
    expect(joinBtn.text()).toBe('JOIN')
  })

  test(('should render a leave button when already attended'), () => {
    const wrapper = mount(<EventCardComp event={testData} />)
    const joinBtn = wrapper.find('button')
    joinBtn.simulate('click')
    expect(joinBtn.text()).toBe('LEAVE')
  })

  test(('should not render a button when event is full'), () => {
    const wrapper = mount(<EventCardComp event={testData2} />)
    const joinBtn = wrapper.find('button')
    expect(joinBtn.length).toBe(0)
  })

  test(('should render a banner when event is full'), () => {
    const wrapper = mount(<EventCardComp event={testData2} />)
    const fullBanner = wrapper.find('.bookedBanner')
    expect(fullBanner.text()).toBe('Event full')
  })

  test('renders event comments', () => {
    const wrapper = mount(<EventCardComp event={testData2} />)
    const commentSpan = wrapper.find('.overlayComments')
    expect(commentSpan.html()).toContain(`<span class=\"comment\">hej</span>`)
  })

})

