<template>
  <section class="not-found" aria-labelledby="not-found-title">
    <p class="not-found__code">404</p>
    <h1 id="not-found-title">This portal leads nowhere.</h1>
    <p class="not-found__message">
      The page you are looking for does not exist in this dimension.
    </p>
    <ActionButton :to="{ name: 'home' }" text="Back to the home page" />
  </section>
</template>

<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
</script>

<style scoped>
.not-found {
  display: flex;
  min-height: 50vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--space-4);
}

.not-found__code {
  color: var(--accent);
  font-family: "Space Grotesk", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.16em;
}

.not-found__message {
  max-width: 32rem;
  color: var(--text-muted);
}
</style>
