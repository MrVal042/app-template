import * as Features from '../../app/features'

describe('app/features exports', () => {
  it('exports at least one item', () => {
    const keys = Object.keys(Features)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported symbol is defined', () => {
    Object.keys(Features).forEach((k) => {
      expect((Features as any)[k]).toBeDefined()
    })
  })
})
