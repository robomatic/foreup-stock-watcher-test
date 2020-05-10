/**
 * The stock service classthat interfaces the stocks API
 */
export default class StockService {
  /**
   * Create a stockService
   * @param {Object} stores 
   */
  constructor(stores) {
    this.searching = stores.searching
    this.searchError = stores.searchError
    this.searchResult = stores.searchResult
    this.stockList = stores.stockList
    this.stockSearchAPI = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=P6RD2B5CYWU7WQOJ&keywords='
    this.stockQuoteAPI = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&interval=5min&apikey=P6RD2B5CYWU7WQOJ&symbol='
  }

  /**
   * parse the search results and return cleaner objects
   * @param {Object} data 
   */
  _parseData(data) {
    let result = {}
    Object.keys(data).forEach((key, _, array) => {
      let newKey = key.split(' ').slice(1, array.length - 1).join('_')
      result[newKey] = data[key]
    })
    return result
  }
  
  /**
   * fetch and stores the quote data for a single search result
   * @param {Object} searchResult 
   */
  fetchAndStoreQuote(searchResult) {
    console.log('fetching quote', searchResult)
    fetch(this.stockQuoteAPI + searchResult.symbol)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data['Global Quote']) {
        const result = {
          id: (new Date()).valueOf(),
          meta: searchResult,
          quote: this._parseData(data['Global Quote'])
        }
        this.stockList.addStock(result)
      } else {
        console.warn('Stock symbol not found')
      }
    })
    .catch(() => {
      this.searchError.set('stock service error')
    })
  }
  
  /**
   * search the api for a stock by keyword and set store to the results
   * @param {String} sym 
   */
  search(sym) {
    console.log('searching ... ', sym)
    this.searching.set(true)
    this.searchError.set(null)
    fetch(this.stockSearchAPI + sym)
    .then(response => response.json())
    .then(data => {
      if (data.bestMatches) {
        // currently this is an exact match
        // clearly we need to handle for matching results that are not exact
        let result = data.bestMatches.map(item => this._parseData(item))
        console.log(result)
        this.searchResult.set(result)
      } else {
        this.searchResult.set(null)
        this.searchError.set('Stock symbol not found')
      }
      this.searching.set(false)
    })
    .catch(error => {
      console.error(error)
      this.searching.set(false)
      this.searchError.set('network error')
    })
  }
}
