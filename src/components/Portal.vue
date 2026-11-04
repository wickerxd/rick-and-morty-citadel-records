<template>
  <div
    class="portal"
    :class="{ 'portal--active': isGlowing }"
    role="img"
    aria-label="Portal illustration"
    @pointermove="handlePointerMove"
    @pointerleave="isGlowing = false"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const isGlowing = ref(false);

function handlePointerMove(event: PointerEvent) {
  const portal = event.currentTarget as HTMLElement;
  const bounds = portal.getBoundingClientRect();

  portal.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
  portal.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
  isGlowing.value = true;
}
</script>

<style scoped>
.portal {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 480px;
  min-width: 0;
  aspect-ratio: 1 / 1;
  margin-inline: auto;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--bg) 0 18%,
    var(--accent) 19% 24%,
    var(--accent-deep) 25% 45%,
    #9bea5f55 46% 52%,
    var(--bg) 70%
  );
  transition: transform 0.3s ease;
}

.portal::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: 50%;
  box-shadow: 0 0 100px 24px #9bea5f66;
  content: "";
  opacity: 0.55;
  animation: portal-pulse 4s ease-in-out infinite;
  pointer-events: none;
}

.portal::after {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at var(--glow-x, 50%) var(--glow-y, 50%),
    rgb(255 255 255 / 32%) 0%,
    #9bea5f77 12%,
    transparent 38%
  );
  content: "";
  opacity: 0;
  mix-blend-mode: screen;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.portal--active {
  transform: scale(1.02);
}

.portal--active::after {
  opacity: 1;
}

@keyframes portal-pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.98);
  }

  50% {
    opacity: 0.85;
    transform: scale(1.02);
  }
}

@media (prefers-reduced-motion: reduce) {
  .portal,
  .portal::after {
    transition: none;
  }

  .portal::before {
    animation: none;
    opacity: 0.55;
  }

  .portal--active {
    transform: none;
  }
}
</style>
