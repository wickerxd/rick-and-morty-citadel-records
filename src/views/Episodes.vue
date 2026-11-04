<template>
  <div class="page">
    <SearchBar v-model="search" placeholder="Search episodes..." />

    <header class="page-header">
      <h1 class="page-title">Episodes</h1>
      <p class="page-subtitle">
        Relive (or discover) the most chaotic adventures.
      </p>
    </header>

    <p v-if="isPending" class="state-message" role="status">
      Loading episodes…
    </p>
    <ErrorState
      v-else-if="isError"
      message="We couldn't load episodes right now."
      :retrying="isFetching"
      @retry="refetch"
    />

    <template v-else>
      <nav class="season-tabs" aria-label="Seasons">
        <RouterLink
          v-for="group in seasonGroups"
          :key="group.season"
          :to="seasonTo(group.season)"
          class="season-tab"
          :class="{ 'season-tab--active': group.season === selectedSeason }"
          :aria-current="
            group.season === selectedSeason ? 'page' : undefined
          "
        >
          <span>Season {{ group.season }}</span>
          <span class="season-tab__count">{{ group.episodes.length }}</span>
        </RouterLink>
      </nav>

      <p
        v-if="filteredEpisodes.length === 0"
        class="state-message"
        role="status"
      >
        No episodes match your search.
      </p>

      <ul v-else class="episode-list" role="list">
        <li v-for="episode in filteredEpisodes" :key="episode.id">
          <EpisodeRow :episode="episode" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAllEpisodes } from "@/api/queries";
import { useDebouncedValue } from "@/composables/useDebouncedValue";
import EpisodeRow from "@/components/EpisodeRow.vue";
import ErrorState from "@/components/ErrorState.vue";
import SearchBar from "@/components/SearchBar.vue";
import type { Episode } from "@/types";

interface SeasonGroup {
  season: number;
  episodes: Episode[];
}

const route = useRoute();
const router = useRouter();

function getQueryString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getRequestedSeason(value: unknown): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const season = Number(raw);
  return Number.isInteger(season) && season > 0 ? season : null;
}

function getSeason(episode: Episode): number {
  const match = /^S(\d+)/.exec(episode.episode);
  return match ? Number(match[1]) : 0;
}

const search = ref(getQueryString(route.query.q));
const debouncedSearch = useDebouncedValue(search);

const { data, isPending, isError, isFetching, refetch } = useAllEpisodes();

const seasonGroups = computed<SeasonGroup[]>(() => {
  const groups = new Map<number, Episode[]>();

  (data.value ?? []).forEach((episode) => {
    const season = getSeason(episode);

    if (!season) {
      return;
    }

    const episodes = groups.get(season) ?? [];
    episodes.push(episode);
    groups.set(season, episodes);
  });

  return [...groups.entries()]
    .sort(([first], [second]) => first - second)
    .map(([season, episodes]) => ({
      season,
      episodes: [...episodes].sort((a, b) =>
        a.episode.localeCompare(b.episode),
      ),
    }));
});

const seasons = computed(() =>
  seasonGroups.value.map((group) => group.season),
);

const requestedSeason = computed(() =>
  getRequestedSeason(route.query.season),
);

const selectedSeason = computed(() => {
  const requested = requestedSeason.value;

  if (requested && seasons.value.includes(requested)) {
    return requested;
  }

  return seasons.value[0] ?? 0;
});

const selectedEpisodes = computed(
  () =>
    seasonGroups.value.find(
      (group) => group.season === selectedSeason.value,
    )?.episodes ?? [],
);

const filteredEpisodes = computed(() => {
  const query = debouncedSearch.value.trim().toLowerCase();

  return selectedEpisodes.value.filter(
    (episode) => !query || episode.name.toLowerCase().includes(query),
  );
});

function seasonTo(season: number) {
  const query: Record<string, string> = { season: String(season) };
  const trimmedSearch = search.value.trim();

  if (trimmedSearch) {
    query.q = trimmedSearch;
  }

  return { name: "episodes", query };
}

watch(debouncedSearch, (value) => {
  const query: Record<string, string> = {};
  const trimmedSearch = value.trim();

  if (selectedSeason.value) {
    query.season = String(selectedSeason.value);
  }

  if (trimmedSearch) {
    query.q = trimmedSearch;
  }

  router.replace({ query });
});
</script>

<style scoped>
.season-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.season-tab {
  display: inline-flex;
  height: 40px;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.875rem;
  transition:
    border-color 0.15s,
    background-color 0.15s,
    color 0.15s;
}

.season-tab:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.season-tab--active {
  border-color: var(--accent);
  background: var(--surface-active);
  color: var(--accent);
}

.season-tab__count {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.season-tab--active .season-tab__count {
  color: var(--accent);
}

.episode-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
