import React from 'react'
import {
  render,
  waitForElement,
  cleanup,
  fireEvent
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

describe('Homepage component', () => {
  it('On loaded card list', async () => {
    mockGetAllData()
    const { getByTestId, getAllByTestId } = render(<App />)
    // render homepage
    await waitForElement(() => getByTestId('homepage'))

    const homepage = getByTestId('homepage')
    const searchForm = getByTestId('search-form')
    const pageNav = getAllByTestId('page-nav')
    const totalItems = getByTestId('totalItems')
    const perPage = getByTestId('perPage-select-input')

    expect(homepage).toBeInTheDocument()
    expect(searchForm).toBeInTheDocument()
    expect(pageNav.length).toEqual(2)
    expect(totalItems).toBeInTheDocument()
    expect(totalItems).toHaveTextContent(/2 items/i)
    expect(perPage).toBeInTheDocument()
  })

  it('Clicking card preview should show card-detail component', async () => {
    mockGetAllData()
    const { getAllByTestId, getByTestId } = render(<App />)
    // render homepage
    await waitForElement(() => getByTestId('homepage'))
    // get all card preview
    const cardPreview = getAllByTestId('card-preview')
    // show card detail
    fireEvent.click(cardPreview[0])

    const cardDetail = getByTestId('card-detail')
    const cardDetailImage = getByTestId('card-detail-image')
    const toDetailPage = getByTestId('toDetailPage')
    const btnFav = getByTestId('btn-fav')
    const cardDetailDesc = getByTestId('card-detail-desc')
    const cardDesc = exampleCards()[0].desc
    const cardImage = exampleCards()[0].card_images[0].image_url

    expect(cardDetail).toBeInTheDocument()
    expect(cardDetailImage).toBeInTheDocument()
    expect(cardDetailImage).toHaveAttribute('src', cardImage)
    expect(cardDetailDesc).toBeInTheDocument()
    expect(cardDetailDesc).toHaveTextContent(cardDesc)
    expect(toDetailPage).toBeInTheDocument()
    expect(btnFav).toBeInTheDocument()
    expect(toDetailPage).toHaveTextContent(/show more/i)
    expect(btnFav).toHaveTextContent(/add to my deck/i)
  })
})
