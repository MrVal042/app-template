import * as Utils from '../../app/utils'

describe('app/utils exports', () => {
  it('exports utility helpers', () => {
    const keys = Object.keys(Utils)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported helper is defined', () => {
    Object.keys(Utils).forEach((k) => {
      expect((Utils as any)[k]).toBeDefined()
    })
  })
})
