
<script>
import { searchError, searching, searchResult } from '../stores/index'

let stockName = null

function submitHandler(e) {
  e.currentTarget.reset()
  service.fetchAndStoreQuote($searchResult[0])
  searchResult.set(null)
}

function resultClickHandler(index) {
  stockName = $searchResult[index].symbol
}

export let service = null
</script>

<form class="form-inline" on:submit|preventDefault={submitHandler}>
  <div class="form-group">
    <input
      type="search"
      name="stockName"
      placeholder="Enter stock symbol"
      bind:value={stockName}
      class="form-control search-control"
      required
      aria-label="search for a stock by symbol"
      on:keyup={() => service.search(stockName)}
      autocomplete="off"
    >
  </div>
  <div class="form-group">
    <button class="btn btn-primary shadow-lg ml-3" type="submit">Add Stock</button>
  </div>
  {#if $searchResult}
    <ul class="results list-unstyled shadow-lg border">
      {#each $searchResult as match, index}
        <li class="px-4 py-1" on:click={() => resultClickHandler(index)}>{match.symbol} <span>{match.name}</span></li>
      {/each}
    </ul>
  {/if}
  <div class="invalid-feedback {$searchError ? 'd-block' : ''}">
    {$searchError}
  </div>
</form>

<style lang="scss">
.form-inline {
  position: relative;
}
.results {
  li {
    cursor: pointer;
    font-size: 1.8rem;
    min-width: 600px;
    display: block;
    background: white;
    line-height: 3rem;
    span {
      float: right;
      font-size: 1.2rem;
    }
    &:hover {
      background-color: var(--light);
    }
  }
  position: absolute;
  left: 0;
  top: 80px;
  z-index: 1000;
}
</style>