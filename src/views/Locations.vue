<template>
  <div class="page">
    <SearchBar v-model="search" placeholder="Search locations..." />

    <header class="page-header">
      <h1 class="page-title">Locations</h1>
      <p class="page-subtitle">
        Explore the many worlds and places across the multiverse.
      </p>
    </header>

    <p v-if="isPending" class="state-message" role="status">
      Loading locations…
    </p>
    <ErrorState
      v-else-if="isError"
      message="We couldn't load locations right now."
      :retrying="isFetching"
      @retry="refetch"
    />

    <template v-else>
      <div
        class="range-tabs"
        role="group"
        aria-label="Filter locations by first letter"
      >
        <button
          v-for="range in rangeOptions"
          :key="range.id"
          type="button"
          class="range-tab"
          :class="{ 'range-tab--active': selectedRange === range.id }"
          :aria-pressed="selectedRange === range.id"
          @click="setRange(range.id)"
        >
          <span>{{ range.label }}</span>
          <span class="range-tab__count">
            {{ rangeCounts[range.id] ?? 0 }}
          </span>
        </button>
      </div>

      <p
        v-if="filteredLocations.length === 0"
        class="state-message"
        role="status"
      >
        No locations match your filters.
      </p>

      <ul v-else class="location-grid" role="list">
        <li v-for="location in filteredLocations" :key="location.id">
          <LocationCard :location="location" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAllLocations } from "@/api/queries";
import { useDebouncedValue } from "@/composables/useDebouncedValue";
import ErrorState from "@/components/ErrorState.vue";
import LocationCard from "@/components/LocationCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import type { Location } from "@/types";

const LETTER_RANGES = [
  { id: "A-E", label: "A–E", letters: ["A", "B", "C", "D", "E"] },
  { id: "F-J", label: "F–J", letters: ["F", "G", "H", "I", "J"] },
  { id: "K-O", label: "K–O", letters: ["K", "L", "M", "N", "O"] },
  { id: "P-T", label: "P–T", letters: ["P", "Q", "R", "S", "T"] },
  { id: "U-Z", label: "U–Z", letters: ["U", "V", "W", "X", "Y", "Z"] },
] as const;

type RangeId =
  | "all"
  | "other"
  | (typeof LETTER_RANGES)[number]["id"];

type RangeOption = { id: RangeId; label: string };

const ALL_RANGE: RangeOption = { id: "all", label: "All" };
const OTHER_RANGE: RangeOption = { id: "other", label: "Other" };

const RANGE_IDS: RangeId[] = [
  "all",
  ...LETTER_RANGES.map((range) => range.id),
  "other",
];

const route = useRoute();
const router = useRouter();
const collator = new Intl.Collator(undefined, { sensitivity: "base" });

function getQueryString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function isRangeId(value: unknown): value is RangeId {
  return (
    typeof value === "string" && RANGE_IDS.includes(value as RangeId)
  );
}

function firstLetter(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

function isLetter(value: string): boolean {
  return /^[A-Z]$/.test(value);
}

function matchesRange(location: Location, rangeId: RangeId): boolean {
  if (rangeId === "all") {
    return true;
  }

  const letter = firstLetter(location.name);

  if (rangeId === "other") {
    return !isLetter(letter);
  }

  const range = LETTER_RANGES.find((item) => item.id === rangeId);
  return (range?.letters as readonly string[] | undefined)?.includes(letter) ?? false;
}

function buildQuery(searchValue: string, range: RangeId) {
  const query: Record<string, string> = {};
  const trimmedSearch = searchValue.trim();

  if (trimmedSearch) {
    query.q = trimmedSearch;
  }

  if (range !== "all") {
    query.range = range;
  }

  return query;
}

const search = ref(getQueryString(route.query.q));
const debouncedSearch = useDebouncedValue(search);

const selectedRange = computed<RangeId>(() =>
  isRangeId(route.query.range) ? route.query.range : "all",
);

const { data, isPending, isError, isFetching, refetch } = useAllLocations();

const sortedLocations = computed(() =>
  [...(data.value ?? [])].sort((a, b) => collator.compare(a.name, b.name)),
);

const hasOtherLocations = computed(() =>
  sortedLocations.value.some(
    (location) => !isLetter(firstLetter(location.name)),
  ),
);

const rangeOptions = computed<RangeOption[]>(() => [
  ALL_RANGE,
  ...LETTER_RANGES,
  ...(hasOtherLocations.value || selectedRange.value === "other"
    ? [OTHER_RANGE]
    : []),
]);

const rangeCounts = computed<Record<RangeId, number>>(() => {
  const counts: Record<RangeId, number> = {
    all: sortedLocations.value.length,
    other: 0,
    "A-E": 0,
    "F-J": 0,
    "K-O": 0,
    "P-T": 0,
    "U-Z": 0,
  };

  sortedLocations.value.forEach((location) => {
    const letter = firstLetter(location.name);

    if (!isLetter(letter)) {
      counts.other += 1;
      return;
    }

    const range = LETTER_RANGES.find((item) =>
      (item.letters as readonly string[]).includes(letter),
    );

    if (range) {
      counts[range.id] += 1;
    }
  });

  return counts;
});

const filteredLocations = computed(() => {
  const query = debouncedSearch.value.trim().toLowerCase();

  return sortedLocations.value.filter((location) => {
    const matchesSearch =
      !query || location.name.toLowerCase().includes(query);

    return matchesSearch && matchesRange(location, selectedRange.value);
  });
});

function setRange(range: RangeId) {
  router.replace({ query: buildQuery(debouncedSearch.value, range) });
}

watch(debouncedSearch, (value) => {
  router.replace({ query: buildQuery(value, selectedRange.value) });
});
</script>

<style scoped>
.range-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.range-tab {
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

.range-tab:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.range-tab--active {
  border-color: var(--accent);
  background: var(--surface-active);
  color: var(--accent);
}

.range-tab__count {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.range-tab--active .range-tab__count {
  color: var(--accent);
}

.location-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 768px) {
  .location-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
  }
}

@media (min-width: 1024px) {
  .location-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
