<template>
  <article class="location-card">
    <span class="location-card__mark" aria-hidden="true">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
      </svg>
    </span>
    <div class="location-card__body">
      <h2 class="location-card__name">{{ location.name }}</h2>
      <p class="location-card__meta">{{ location.type }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Location } from "@/types";

defineProps<{ location: Location }>();
</script>

<style scoped>
.location-card {
  display: flex;
  height: 100%;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.location-card__mark {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-active);
  color: var(--accent);
}

.location-card__name {
  overflow: hidden;
  font-size: 1rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.location-card__meta {
  margin-top: var(--space-1);
  color: var(--text-muted);
  font-size: 0.8125rem;
}
</style>
