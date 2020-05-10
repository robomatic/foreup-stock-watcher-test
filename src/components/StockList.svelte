<script>
import Stock from './Stock.svelte'

export let stockList = null
</script>

<section class="stock-list d-flex flex-wrap">
  {#if $stockList}
    {#each $stockList as stock (stock.id)}
      <Stock {stock}/>
    {/each}
  {/if}
</section>

<style lang="scss">
.stock-list {
  display: inline-grid;
  grid-gap: 22px;
}
</style>
