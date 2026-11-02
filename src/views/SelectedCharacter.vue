<template>
  <div class="page">
    <SearchBar v-model="search" placeholder="Search characters..." />

    <RouterLink :to="{ name: 'characters' }" class="back-link">
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M12 5 7 10l5 5" />
      </svg>
      Back to characters
    </RouterLink>

    <p v-if="!isValidId" class="state-message" role="alert">
      That character could not be found.
    </p>
    <p v-else-if="isPending" class="state-message" role="status">
      Loading character…
    </p>
    <p
      v-else-if="isError || !selectedCharacter"
      class="state-message state-message--error"
      role="alert"
    >
      We couldn't load this character.
    </p>

    <article v-else class="character-detail">
      <div class="character-detail__layout">
        <figure class="character-detail__portrait">
          <img
            v-if="selectedCharacter.image && !imageFailed"
            :src="selectedCharacter.image"
            :alt="`Portrait of ${selectedCharacter.name}`"
            width="300"
            height="300"
            loading="eager"
            referrerpolicy="no-referrer"
            @error="imageFailed = true"
          />
          <span
            v-else
            class="character-detail__fallback"
            role="img"
            :aria-label="`Portrait unavailable for ${selectedCharacter.name}`"
          >
            {{ initials }}
          </span>
        </figure>

        <div class="character-detail__content">
          <div class="character-detail__info">
            <header class="character-detail__header">
              <h1>{{ selectedCharacter.name }}</h1>
              <p>{{ selectedCharacter.species }}</p>
            </header>

            <dl class="facts">
              <div class="fact">
                <dt>Status</dt>
                <dd>
                  <StatusIndicator :status="selectedCharacter.status" />
                </dd>
              </div>
              <div class="fact">
                <dt>Gender</dt>
                <dd>{{ selectedCharacter.gender }}</dd>
              </div>
              <div class="fact">
                <dt>Origin</dt>
                <dd>{{ selectedCharacter.origin.name }}</dd>
              </div>
              <div class="fact">
                <dt>Location</dt>
                <dd>{{ selectedCharacter.location.name }}</dd>
              </div>
            </dl>
          </div>

          <section
            class="character-detail__about"
            aria-labelledby="about-title"
          >
            <h2 id="about-title">About</h2>
            <p>{{ about }}</p>
          </section>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useCharacter } from "@/api/queries";
import { useDebouncedValue } from "@/composables/useDebouncedValue";
import SearchBar from "@/components/SearchBar.vue";
import StatusIndicator from "@/components/StatusIndicator.vue";
import { buildCharacterBio } from "@/utils/character";

const route = useRoute();
const router = useRouter();

const characterId = computed(() => {
  const value = route.params.characterId;
  return Number(Array.isArray(value) ? value[0] : value);
});

const isValidId = computed(
  () => Number.isInteger(characterId.value) && characterId.value > 0,
);

const { data: selectedCharacter, isPending, isError } =
  useCharacter(characterId);

const about = computed(() =>
  selectedCharacter.value ? buildCharacterBio(selectedCharacter.value) : "",
);

const initials = computed(() => {
  const name = selectedCharacter.value?.name ?? "";

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
});

const imageFailed = ref(false);

watch(characterId, () => {
  imageFailed.value = false;
});

const search = ref("");
const debouncedSearch = useDebouncedValue(search);

watch(debouncedSearch, (value) => {
  const query = value.trim();

  if (query) {
    router.push({ name: "characters", query: { q: query } });
  }
});
</script>

<style scoped>
.character-detail__layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

@media (min-width: 640px) {
  .character-detail__layout {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-7);
  }
}

.character-detail__portrait {
  width: 100%;
  max-width: 360px;
  margin: 0;
}

@media (min-width: 640px) {
  .character-detail__portrait {
    width: clamp(180px, 28vw, 320px);
    flex: 0 0 auto;
  }
}

.character-detail__portrait img,
.character-detail__fallback {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
}

.character-detail__portrait img {
  object-fit: cover;
  background: var(--surface);
}

.character-detail__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 30% 30%, #9bea5f66, transparent 48%),
    linear-gradient(135deg, var(--accent-deep), var(--surface));
  color: var(--accent);
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
}

.character-detail__content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: var(--space-6);
}

.character-detail__header h1 {
  font-size: clamp(2rem, 6vw, 2.5rem);
}

.character-detail__header p {
  margin-top: var(--space-2);
  color: var(--text-muted);
}

.facts {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin: var(--space-5) 0 0;
}

.fact dt {
  color: var(--text-muted);
  font-size: 0.8125rem;
}

.fact dd {
  margin: 2px 0 0;
  color: var(--text-body);
}

.character-detail__about h2 {
  font-size: 1.375rem;
}

.character-detail__about p {
  margin-top: var(--space-3);
  max-width: 52rem;
  color: var(--text-body);
  font-size: 1rem;
}
</style>
