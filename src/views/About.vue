<template>
  <div class="page about">
    <header class="about__header">
      <p class="eyebrow">About</p>
      <h1>About C-137 Explorer</h1>
      <p class="about__lead">
        C-137 Explorer is an unofficial, fan-made field guide to the characters,
        episodes, and locations of Rick and Morty. It is built for quick
        browsing, not as a complete episode guide.
      </p>
    </header>

    <div class="about__grid">
      <section class="about-card" aria-labelledby="about-explore">
        <h2 id="about-explore">What you can explore</h2>
        <p>
          Browse characters and filter them by name or status, move through
          episodes season by season, and find locations by name or first letter.
        </p>
      </section>

      <section class="about-card" aria-labelledby="about-data">
        <h2 id="about-data">Where the data comes from</h2>
        <p>
          All character, episode, and location information comes from the
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer"
          >
            Rick and Morty API
          </a>.
        </p>
      </section>

      <section class="about-card" aria-labelledby="about-built">
        <h2 id="about-built">How it is built</h2>
        <p>
          The site uses Vue 3, Vue Router, TanStack Query, and Vite. It is a
          small front-end project focused on clear navigation and fast browsing.
        </p>
      </section>

      <section class="about-card" aria-labelledby="about-disclaimer">
        <h2 id="about-disclaimer">Disclaimer</h2>
        <p>
          This is a non-commercial fan project. It is not affiliated with Adult
          Swim, Warner Bros. Discovery, or the creators of Rick and Morty.
        </p>
      </section>
    </div>

    <div class="about__actions">
      <ActionButton :to="{ name: 'characters' }" text="Start with characters" />
      <ActionButton
        :type="ButtonType.Secondary"
        :to="{ name: 'home' }"
        text="Back to home"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import { ButtonType } from "@/types";
</script>

<style scoped>
.about {
  max-width: 64rem;
}

.about__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.about__lead {
  max-width: 48rem;
  color: var(--text-muted);
  font-size: 1.125rem;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}

@media (min-width: 768px) {
  .about__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-4);
  }
}

.about-card {
  padding: var(--space-5);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.about-card h2 {
  font-size: 1.125rem;
}

.about-card p {
  margin-top: var(--space-2);
  color: var(--text-muted);
}

.about-card a {
  color: var(--accent);
}

.about-card a:hover {
  text-decoration: underline;
}

.about__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

@media (min-width: 640px) {
  .about__actions {
    flex-direction: row;
  }
}
</style>
