import * as Api from '../../app/api'

describe('app/api exports', () => {
  it('exports at least one component', () => {
    const keys = Object.keys(Api)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported symbol is defined', () => {
    Object.keys(Api).forEach((k) => {
      // basic existence check
      expect((Api as any)[k]).toBeDefined()
    })
  })
})
