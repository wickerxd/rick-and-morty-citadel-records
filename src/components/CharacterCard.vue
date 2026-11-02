<template>
  <article class="character-card">
    <RouterLink
      :to="{ name: 'character-detail', params: { characterId: character.id } }"
      class="character-card__link"
    >
      <img
        class="character-card__image"
        :src="character.image"
        :alt="`Portrait of ${character.name}`"
        width="300"
        height="300"
        loading="lazy"
        referrerpolicy="no-referrer"
      />
      <div class="character-card__body">
        <h2 class="character-card__name">{{ character.name }}</h2>
        <p class="character-card__meta">{{ character.species }}</p>
      </div>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

defineProps<{ character: Character }>();
</script>

<style scoped>
.character-card {
  overflow: hidden;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  transition:
    border-color 0.15s,
    transform 0.15s;
}

.character-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.character-card__link {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.character-card__image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background: var(--border);
}

.character-card__body {
  padding: 14px;
}

.character-card__name {
  overflow: hidden;
  font-size: 1rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.character-card__meta {
  margin-top: var(--space-1);
  color: var(--text-muted);
  font-size: 0.8125rem;
}
</style>
