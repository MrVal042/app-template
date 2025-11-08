import * as Components from '../../app/components'

describe('app/components exports', () => {
  it('exports at least one component', () => {
    const keys = Object.keys(Components)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported symbol is defined', () => {
    Object.keys(Components).forEach((k) => {
      // basic existence check
      expect((Components as any)[k]).toBeDefined()
    })
  })
})
