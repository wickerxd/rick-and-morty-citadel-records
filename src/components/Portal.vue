<template>
  <div class="portal" role="img" aria-label="Portal illustration"></div>
</template>

<style scoped>
.portal {
  flex: 1;
  min-width: 300px;
  max-width: 480px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--bg) 0 18%,
    var(--accent) 19% 24%,
    var(--accent-deep) 25% 45%,
    #9bea5f55 46% 52%,
    var(--bg) 70%
  );
  box-shadow: 0 0 120px #9bea5f55;
}
</style>
