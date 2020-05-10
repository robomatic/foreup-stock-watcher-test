import { writable } from 'svelte/store'

export const searching = writable(false)
export const searchError = writable(null)
export const searchResult = writable(null)

function createStocks() {
  const { subscribe, set, update} = writable([])
  return {
    addStock: (stock) => {
      // TODO: check for duplicates
      update(stockList => [...stockList, stock])
    },
    set,
    subscribe,
    reset: () => set([])
  }
}
export const stockList = createStocks()