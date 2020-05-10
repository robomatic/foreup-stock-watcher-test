<script>
import { fade } from 'svelte/transition'
export let stock = null
console.log('stock component', stock)

function quoteNum(num) {
  return parseFloat(num).toFixed(2)
}

function chartNum(price, high, low) {
  let priceOverLow = price - low
  let range = high - low
  return priceOverLow / range * 142
}

$: stockOpen = quoteNum(stock.quote.open)
$: stockHigh = quoteNum(stock.quote.high)
$: stockLow = quoteNum(stock.quote.low)
$: stockPrice = quoteNum(stock.quote.price)
$: stockPriceChart = chartNum(stockPrice, stockHigh, stockLow)
$: stockChange = quoteNum(stock.quote.change)
$: stockChangePercent = quoteNum(stock.quote.change_percent)
$: changeDir = () => { 
  switch(true) {
    case stockChange > 0:
      return 'up';
    case stockChange < 0:
      return 'down';
    default:
      return 'zero';
  }
}
</script>

{#if stock.quote}
  <article class="stock shadow-lg" transition:fade>
    
    <figure class="stock-micro-chart {changeDir()}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 146 211"
      >
        <defs>
          <style>
            .cls-1{fill:url(#linear-gradient);}
            .cls-2,.cls-3{fill:#fff;}
            .cls-3{font-size:18px;font-weight: 700;}
          </style>
          <linearGradient id="linear-gradient">
            <stop offset="0" stop-color="#fff"/>
            <stop offset="1" stop-color="#fff" stop-opacity="0.3"/>
          </linearGradient>
        </defs>
        <rect class="cls-1" x="43" y="24" width="4" height="162"/>
        <polygon
          class="cls-2"
          points="25.93 167.32 25.93 186.32 43.93 177.32 25.93 167.32"
          transform="translate(0 -{stockPriceChart})"
        />
        <text class="cls-3" transform="translate(60.35 38.09)">{stockHigh}</text>
        <text class="cls-3" transform="translate(60.35 186.09)">{stockLow}</text>
      </svg>
    </figure>

    <section class="stock-quote">
      <h3>{stock.meta.name}</h3>
      <p>
        <small>{stock.meta.symbol}</small>
      </p>
      <p class="stock-quote-num">
        <span>{stockPrice}</span>
        <span class="{changeDir()}">
          {#if changeDir() !== 'zero'}
            <i class="fas fa-arrow-{changeDir()}"></i>
          {/if}
          {stockChange}
        </span>
        <span class="{changeDir()}2">({stockChangePercent}%)</span>
      </p>
      <ul class="stock-details">
        <li>Open <span>{stockOpen}</span></li>
        <li>High <span>{stockHigh}</span></li>
        <li>Low <span>{stockLow}</span></li>
      </ul>
    </section>

  </article>
{/if}

<style lang="scss">
// lets clarify the colors with the designer and make them global varialbes imported here
$graylight: gray;
.stock {
  width: 635px;
  height: 212px;
  display: flex;
  line-height: 1;
  background-color: white;
  p {
    margin-bottom: 15px;
  }
}
.stock-micro-chart {
  width: 145px;
  height: 100%;
  &.up {
    background-image: linear-gradient(0deg, var(--green-dark) 0%, var(--green-light) 100%);
  }
  &.down {
    background-image: linear-gradient(0deg, var(--red-dark) 0%, var(--red-light) 100%);
  }
  &.zero {
    background-image: linear-gradient(0deg, var(--dark) 0%, var(--light) 100%);
  }
}
.stock-quote {
  flex: 1 1 auto;
  padding: 2.5rem;
  h3 {
    font-size: 1.75rem;
    text-transform: uppercase;
    font-weight: 800;
    margin: 0;
    padding: 0;
    line-height: .8;
    width: 400px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
  small {
    font-size: 1.3rem;
    color: $graylight;
  }
  .stock-quote-num {
    font-size: 1.1rem;
    span {
      margin-left: 10px;
    }
    & span:nth-of-type(1) {
      color: #3E5769;
      font-size: 2.7rem;
      margin-left: 0;
    }
    i.fas {
      font-size: .9rem;
    }
  }
  .up { color: var(--green-dark); }
  .up2 { color: var(--green); }
  .down { color: var(--red-dark); }
  .down2 { color: var(--red); }
}
.stock-details {
  font-size: 1.1rem;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: left;
  li {
    flex: 1 1 auto;
    color: $graylight;
    span {
      margin-left: 4px;
      color: #3E5769;
    }
  }
}
</style>
