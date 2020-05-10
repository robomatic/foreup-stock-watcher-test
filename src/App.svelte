<script>
import '@fortawesome/fontawesome-free/css/all.css'
import { onMount } from 'svelte'
import Spinner from './components/Spinner.svelte'
import StockSearchForm from './components/StockSearchForm.svelte'
import StockList from './components/StockList.svelte'
import { stockList, searching, searchError, searchResult } from './stores/index'
import StockService from './StockService'

let loading = true
const stockService = new StockService({ stockList, searching, searchError, searchResult })

onMount(() => {
  loading = false
})
</script>

{#if loading}
  <Spinner/>
{:else}
  <div class="container-fluid view-main">
    <header class="mb-xl-4 pb-xl-4">
      <h1>Stock Watcher</h1>
    </header>
    <nav class="pt-xl-4 mb-4">
      <StockSearchForm service={stockService}/>
    </nav>
    <main>
      <StockList {stockList}/>
    </main>
  </div>
{/if}

<style>
.view-main {
  min-height: 1000px;
}
</style>