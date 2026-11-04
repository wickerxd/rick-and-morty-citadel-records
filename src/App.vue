<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="container site-header__inner">
        <RouterLink to="/" class="brand" aria-label="C-137 Explorer home">
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
          <span>C-137 Explorer</span>
        </RouterLink>

        <nav class="site-nav" aria-label="Main">
          <NavLink :to="{ name: 'characters' }">Characters</NavLink>
          <NavLink :to="{ name: 'episodes' }">Episodes</NavLink>
          <NavLink :to="{ name: 'locations' }">Locations</NavLink>
          <NavLink :to="{ name: 'about' }">About</NavLink>
        </nav>
      </div>
    </header>

    <main class="container site-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <div class="container site-footer__inner">
        <p>
          Fan-made explorer. Data from the
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer"
          >
            Rick and Morty API </a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavLink from "@/components/NavLink.vue";
</script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-header {
  border-bottom: 1px solid var(--border);
}

.site-header__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-block: var(--space-4) var(--space-2);
}

@media (min-width: 768px) {
  .site-header__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding-block: 20px;
  }
}

.brand {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--space-3);
  color: var(--accent);
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  white-space: nowrap;
}

.site-nav {
  display: flex;
  justify-content: space-between;
  gap: var(--space-1);
}

@media (min-width: 768px) {
  .site-nav {
    justify-content: flex-start;
    gap: var(--space-2);
  }
}

.site-main {
  flex: 1;
  padding-block: var(--space-4) var(--space-8);
}

@media (min-width: 768px) {
  .site-main {
    padding-block: var(--space-5) var(--space-8);
  }
}

.site-footer {
  border-top: 1px solid var(--border);
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-block: var(--space-5);
  color: var(--text-muted);
  font-size: 0.875rem;
}

.site-footer a {
  color: var(--accent);
}

.site-footer a:hover {
  text-decoration: underline;
}

.footer-link {
  width: fit-content;
}

@media (min-width: 768px) {
  .site-footer__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
