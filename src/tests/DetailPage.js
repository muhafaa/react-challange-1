import React from 'react'
import {
  render,
  waitForElement,
  fireEvent,
  cleanup
} from '@testing-library/react'
import App from '../App'
import axiosMock from 'axios'

afterEach(cleanup)

function exampleCards() {
  return [
    {
      id: 34541863,
      name: '"A" Cell Breeding Device',
      type: 'Spell Card',
      desc:
        'During each of your Standby Phases, put 1 A-Counter on 1 face-up monster your opponent controls.',
      race: 'Continuous',
      archetype: 'Alien',
      card_images: [
        {
          id: 34541863,
          image_url:
            'https://storage.googleapis.com/ygoprodeck.com/pics/34541863.jpg',
          image_url_small:
            'https://storage.googleapis.com/ygoprodeck.com/pics_small/34541863.jpg'
        }
      ]
    },
    {
      id: 64163367,
      name: '"A" Cell Incubator',
      type: 'Spell Card',
      desc:
        'Each time an A-Counter(s) is removed from play by a card effect, place 1 A-Counter on this card. When this card is destroyed, distribute the A-Counters on this card among face-up monsters.',
      race: 'Continuous',
      archetype: 'Alien',
      card_images: [
        {
          id: 64163367,
          image_url:
            'https://storage.googleapis.com/ygoprodeck.com/pics/64163367.jpg',
          image_url_small:
            'https://storage.googleapis.com/ygoprodeck.com/pics_small/64163367.jpg'
        }
      ]
    }
  ]
}

function mockGetAllData() {
  axiosMock.get.mockResolvedValueOnce({
    data: exampleCards()
  })
}

jest.mock('axios')

describe('Detail Page Component', () => {
  it('On loaded cardDetail', async () => {
    mockGetAllData()
    const { getAllByTestId, getByTestId, debug } = render(<App />)
    await waitForElement(() => getByTestId('homepage'))
    const cardPreview = getAllByTestId('card-preview')
    fireEvent.click(cardPreview[0])
    const toDetailPage = getByTestId('toDetailPage')
    fireEvent.click(toDetailPage)
    axiosMock.get.mockResolvedValueOnce({
      data: [exampleCards()[0]]
    })
    debug()
  })
})
