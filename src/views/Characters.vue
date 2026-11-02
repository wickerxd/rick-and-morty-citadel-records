<template>
  <div class="page">
    <SearchBar v-model="search" placeholder="Search characters..." />

    <header class="page-header">
      <div class="page-header__row">
        <div>
          <h1 class="page-title">Characters</h1>
          <p class="page-subtitle">
            Browse through all characters from the universe.
          </p>
        </div>
        <StatusFilter v-model="status" />
      </div>
    </header>

    <p v-if="isPending" class="state-message" role="status">
      Loading characters…
    </p>
    <p
      v-else-if="isError"
      class="state-message state-message--error"
      role="alert"
    >
      We couldn't load characters right now.
    </p>
    <p v-else-if="characters.length === 0" class="state-message" role="status">
      No characters found.
    </p>

    <template v-else>
      <p class="result-count">
        {{ totalCount }} {{ totalCount === 1 ? "character" : "characters" }}
      </p>

      <ul class="character-grid" role="list">
        <li v-for="character in characters" :key="character.id">
          <CharacterCard :character="character" />
        </li>
      </ul>

      <Pagination
        v-if="totalPages > 1"
        :page="page"
        :total-pages="totalPages"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCharactersPage } from "@/api/queries";
import { useDebouncedValue } from "@/composables/useDebouncedValue";
import CharacterCard from "@/components/CharacterCard.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import StatusFilter from "@/components/StatusFilter.vue";
import {
  CHARACTER_STATUSES,
  type CharacterFilters,
  type CharacterStatus,
  type CharacterStatusFilter,
} from "@/types";

const route = useRoute();
const router = useRouter();

function getQueryString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getPage(value: unknown): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function isCharacterStatus(value: unknown): value is CharacterStatus {
  return (
    typeof value === "string" &&
    CHARACTER_STATUSES.includes(value as CharacterStatus)
  );
}

const search = ref(getQueryString(route.query.q));
const status = ref<CharacterStatusFilter>(
  isCharacterStatus(route.query.status) ? route.query.status : "All",
);
const debouncedSearch = useDebouncedValue(search);

const page = computed(() => getPage(route.query.page));

const filters = computed<CharacterFilters>(() => ({
  name: debouncedSearch.value.trim() || undefined,
  status: status.value === "All" ? undefined : status.value,
}));

const { data, isPending, isError } = useCharactersPage(filters, page);

const characters = computed(() => data.value?.results ?? []);
const totalPages = computed(() => data.value?.info.pages ?? 0);
const totalCount = computed(() => data.value?.info.count ?? 0);

watch(filters, (value) => {
  const query: Record<string, string> = {};

  if (value.name) {
    query.q = value.name;
  }

  if (value.status) {
    query.status = value.status;
  }

  router.replace({ query });
});
</script>

<style scoped>
.result-count {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 640px) {
  .character-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
  }
}

@media (min-width: 1024px) {
  .character-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .character-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
