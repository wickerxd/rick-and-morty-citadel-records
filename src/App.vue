<template>
  <Suspense>
    <div class="container">
      <header class="header-item">
        <h1 class="main-title">
          <router-link to="/">Citadel Directory</router-link>
        </h1>

        <nav class="menu-items">
          <router-link to="/characters">Characters</router-link>
          <router-link to="/locations">Locations</router-link>
          <router-link to="/episodes">Episodes</router-link>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.menu-items {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.main-title {
  color: var(--accent);
}
</style>
