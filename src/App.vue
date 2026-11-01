<template>
  <Suspense>
    <div class="container">
      <header class="header-item">
        <h1 class="main-title">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <circle cx="14" cy="14" r="11" />
            <circle cx="14" cy="14" r="5" />
          </svg>
          <router-link to="/">Citadel Directory</router-link>
        </h1>

        <nav class="menu-items">
          <router-link class="menu-item" to="/characters"
            >Characters</router-link
          >
          <router-link class="menu-item" to="/locations">Locations</router-link>
          <router-link class="menu-item" to="/episodes">Episodes</router-link>
        </nav>
      </header>

      <RouterView />
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.header-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
}
.menu-items {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-around;

  @media (min-width: 768px) {
    align-items: center;
  }
}

.menu-item {
  padding: 12px 16px;
  border-radius: 10px;
}
.menu-item:hover,
.menu-item:focus-visible {
  color: var(--accent);
}
.menu-item.router-link-active {
  background: var(--surface-active);
  color: var(--accent);
}

.main-title {
  color: var(--accent);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
}
</style>
