import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Render App', () => {
  describe('Navigation component', () => {
    it('Navbar should have title like = "yu-gi-oh deck" and "my-deck"', () => {
      const { getByTestId } = render(<App />)
      const navbar = getByTestId('navbar')
      const linkToHome = getByTestId('linkToHome')
      const linkToDeck = getByTestId('linkToDeck')
      expect(navbar).toBeInTheDocument()
      expect(linkToHome).toHaveTextContent(/yu-gi-oh deck/i)
      expect(linkToDeck).toHaveTextContent(/my deck/i)
    })

    it('Navbar link with title "my-deck" should redirect to "MyDeck" page', () => {
      const { getByTestId } = render(<App />)
      const linkToDeck = getByTestId('linkToDeck')
      fireEvent.click(linkToDeck)
      const deckPage = getByTestId('deck-page')
      expect(deckPage).toBeInTheDocument()
    })
  })
})
