import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

let getTempSpy
describe('App.jsx', () => {
  beforeEach(() => {
    getTempSpy = jest.spyOn(App.prototype, "getTemp")
      .mockReturnValue({ temp: 35 })
    render(<App />)
  })
  it('is expected to display temp value of 35', () => {
    expect(getTempSpy).toHaveTextContent(35)
  });
});