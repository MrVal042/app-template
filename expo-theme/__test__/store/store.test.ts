import * as Store from '../../app/store'

describe('app/store exports', () => {
  it('exports store helpers', () => {
    const keys = Object.keys(Store)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported store is defined', () => {
    Object.keys(Store).forEach((k) => {
      expect((Store as any)[k]).toBeDefined()
    })
  })
})
