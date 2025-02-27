import { ref } from 'vue-demi'
import { refAutoReset } from '.'

describe('refAutoReset', () => {
  it('should be defined', () => {
    expect(refAutoReset).toBeDefined()
  })

  it('should be default at first', () => {
    const val = refAutoReset('default', 100)
    expect(val.value).toBe('default')
  })

  it('should be updated', () => {
    const val = refAutoReset('default', 100)

    val.value = 'update'
    expect(val.value).toBe('update')
  })

  it('should be reset', async() => {
    const val = refAutoReset('default', 100)
    val.value = 'update'

    await new Promise(resolve => setTimeout(resolve, 100 + 1))
    expect(val.value).toBe('default')
  })

  it('should change afterMs', async() => {
    const afterMs = ref(150)
    const val = refAutoReset('default', afterMs)
    val.value = 'update'
    afterMs.value = 100

    await new Promise(resolve => setTimeout(resolve, 100 + 1))
    expect(val.value).toBe('update')

    await new Promise(resolve => setTimeout(resolve, 50))
    expect(val.value).toBe('default')

    val.value = 'update'

    await new Promise(resolve => setTimeout(resolve, 100 + 1))
    expect(val.value).toBe('default')
  })
})
