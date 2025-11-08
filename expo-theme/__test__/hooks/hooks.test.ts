import * as Hooks from '../../app/hooks'

describe('app/hooks exports', () => {
  it('exports hooks', () => {
    const keys = Object.keys(Hooks)
    expect(keys.length).toBeGreaterThan(0)
  })

  it('each exported hook is defined', () => {
    Object.keys(Hooks).forEach((k) => {
      expect((Hooks as any)[k]).toBeDefined()
    })
  })
})
