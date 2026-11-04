<template>
  <div class="home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__content">
        <h1 id="hero-title" class="hero-title">
          Explore the <span>Rick and Morty</span> Universe
        </h1>
        <p class="hero-intro">
          Discover characters, episodes and locations across the multiverse.
        </p>

        <div class="hero-actions">
          <ActionButton :to="{ name: 'characters' }" text="Browse Characters" />
          <ActionButton
            :type="ButtonType.Secondary"
            :to="{ name: 'episodes' }"
            text="View Episodes"
          />
        </div>
      </div>

      <Portal />
    </section>

    <section class="explore" aria-labelledby="explore-title">
      <div class="explore__intro">
        <p class="eyebrow">What is this?</p>
        <h2 id="explore-title">A field guide to the multiverse</h2>
        <p>
          C-137 Explorer is a fan-made directory for the characters, episodes,
          and locations of Rick and Morty. Pick a portal below to start
          exploring.
        </p>
      </div>

      <ul class="explore-grid" role="list">
        <li>
          <RouterLink :to="{ name: 'characters' }" class="explore-card">
            <h3 class="explore-card__title">Characters</h3>
            <p class="explore-card__text">
              Meet the residents of the multiverse, then filter them by name or
              status.
            </p>
            <span class="explore-card__cta">Browse characters →</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'episodes' }" class="explore-card">
            <h3 class="explore-card__title">Episodes</h3>
            <p class="explore-card__text">
              Jump between seasons and find every chaotic adventure by title.
            </p>
            <span class="explore-card__cta">Browse episodes →</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'locations' }" class="explore-card">
            <h3 class="explore-card__title">Locations</h3>
            <p class="explore-card__text">
              Visit planets, dimensions, and other strange places from the show.
            </p>
            <span class="explore-card__cta">Browse locations →</span>
          </RouterLink>
        </li>
      </ul>

      <RouterLink :to="{ name: 'about' }" class="about-link">
        Learn more about this project
      </RouterLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import ActionButton from "@/components/ActionButton.vue";
import Portal from "@/components/Portal.vue";
import { ButtonType } from "@/types";
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-6);
}

@media (min-width: 900px) {
  .hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-8);
  }
}

.hero__content {
  display: flex;
  max-width: 36rem;
  flex-direction: column;
  gap: var(--space-5);
}

.hero-title {
  font-size: clamp(2.375rem, 8vw, 4rem);
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1.05;
}

.hero-title span {
  color: var(--accent);
}

.hero-intro {
  max-width: 420px;
  color: var(--text-muted);
  font-size: 1.125rem;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.hero-actions :deep(.btn) {
  width: 100%;
}

@media (min-width: 640px) {
  .hero-actions {
    flex-direction: row;
  }

  .hero-actions :deep(.btn) {
    width: auto;
  }
}

.explore {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-top: var(--space-8);
  padding-top: var(--space-7);
  border-top: 1px solid var(--border);
}

.explore__intro {
  display: flex;
  max-width: 46rem;
  flex-direction: column;
  gap: var(--space-2);
}

.explore__intro h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
}

.explore__intro p:last-child {
  color: var(--text-muted);
}

.explore-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 640px) {
  .explore-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
  }
}

.explore-card {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-5);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  transition:
    border-color 0.15s,
    transform 0.15s;
}

.explore-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.explore-card__title {
  font-size: 1.125rem;
}

.explore-card__text {
  color: var(--text-muted);
  font-size: 0.9375rem;
}

.explore-card__cta {
  margin-top: auto;
  padding-top: var(--space-3);
  color: var(--accent);
  font-size: 0.875rem;
}

.about-link {
  width: fit-content;
  color: var(--accent);
  font-size: 0.9375rem;
}

.about-link:hover {
  text-decoration: underline;
}
</style>
