<script>
  export let contained = false
</script>

<style>
  .d-flex {
    height: 100vh;
  }
  div.contained {
    display: block;
    height: auto;
  }
</style>

<div class="d-flex justify-content-center align-items-center {contained ? 'contained' : ''}">
  <div class="spinner-grow" style="width: 4rem; height: 4rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
