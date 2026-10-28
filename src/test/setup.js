import { afterEach, beforeEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
beforeEach(() => {
  window.history.replaceState({}, '', '/')
  vi.spyOn(window, 'confirm').mockReturnValue(true)
})
afterEach(cleanup)
