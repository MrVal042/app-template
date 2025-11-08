import * as Constants from '../../app/constants'

describe('app/constants exports', () => {
  it('exports constants', () => {
    const keys = Object.keys(Constants)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported constant is defined', () => {
    Object.keys(Constants).forEach((k) => {
      expect((Constants as any)[k]).toBeDefined()
    })
  })
})
