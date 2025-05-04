import "@testing-library/jest-dom"

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock window.performance.memory
Object.defineProperty(window, "performance", {
  writable: true,
  value: {
    ...window.performance,
    memory: {
      jsHeapSizeLimit: 2147483648,
      totalJSHeapSize: 50000000,
      usedJSHeapSize: 25000000,
    },
  },
})

// Mock IntersectionObserver
class IntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    this.callback([{ isIntersecting: true }])
  }
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = IntersectionObserver
