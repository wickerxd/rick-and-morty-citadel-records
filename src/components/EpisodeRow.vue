<template>
  <article class="episode-row">
    <span class="episode-row__thumb" aria-hidden="true">
      {{ episode.episode }}
    </span>
    <div class="episode-row__body">
      <h2 class="episode-row__name">{{ episode.name }}</h2>
      <p class="episode-row__date">
        <time :datetime="episode.air_date">{{ airDate }}</time>
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Episode } from "@/types";
import { formatAirDate } from "@/utils/format";

const props = defineProps<{ episode: Episode }>();

const airDate = computed(() => formatAirDate(props.episode.air_date));
</script>

<style scoped>
.episode-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.episode-row__thumb {
  display: inline-flex;
  width: 120px;
  flex: 0 0 120px;
  aspect-ratio: 16 / 10;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background:
    radial-gradient(circle at 30% 30%, #9bea5f55, transparent 45%),
    linear-gradient(135deg, var(--accent-deep), var(--bg));
  color: var(--accent);
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.episode-row__body {
  min-width: 0;
}

.episode-row__name {
  overflow: hidden;
  font-size: 1rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.episode-row__date {
  margin-top: var(--space-1);
  color: var(--text-muted);
  font-size: 0.8125rem;
}
</style>
