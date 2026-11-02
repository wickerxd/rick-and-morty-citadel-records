<template>
  <RouterLink :to="to" class="nav-link" active-class="nav-link--active">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router";

defineProps<{ to: RouteLocationRaw }>();
</script>

<style scoped>
.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 12px 8px;
  border-radius: 10px;
  color: var(--text-muted);
  transition:
    background-color 0.15s,
    color 0.15s;
}

.nav-link:hover {
  color: var(--accent);
}

.nav-link--active {
  background: var(--surface-active);
  color: var(--accent);
}

@media (min-width: 768px) {
  .nav-link {
    padding: 12px 16px;
  }
}
</style>
