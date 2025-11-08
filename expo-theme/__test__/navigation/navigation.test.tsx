import * as Navigation from '../../app/navigation'

describe('app/navigation exports', () => {
  it('exports navigators and helpers', () => {
    const keys = Object.keys(Navigation)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported symbol is defined', () => {
    Object.keys(Navigation).forEach((k) => {
      expect((Navigation as any)[k]).toBeDefined()
    })
  })
})
