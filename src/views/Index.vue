<template>
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
</template>

<script setup lang="ts">
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
</style>
