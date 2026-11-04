<template>
  <span
    class="character-image"
    :class="[
      `character-image--${status}`,
      { 'character-image--large': size === 'large' },
    ]"
  >
    <span
      v-if="status === 'loading'"
      class="character-image__skeleton"
      aria-hidden="true"
    />

    <img
      v-if="displaySrc && status !== 'error'"
      :src="displaySrc"
      :alt="`Portrait of ${name}`"
      width="300"
      height="300"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      referrerpolicy="no-referrer"
      :class="{ 'is-loaded': status === 'loaded' }"
      @load="handleLoad"
      @error="handleError"
    />

    <span
      v-if="status === 'error'"
      class="character-image__fallback"
      role="img"
      :aria-label="`Portrait unavailable for ${name}`"
    >
      {{ initials }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, onScopeDispose, ref, watch } from "vue";

type ImageStatus = "loading" | "loaded" | "error";

const props = withDefaults(
  defineProps<{
    src?: string;
    name: string;
    eager?: boolean;
    size?: "card" | "large";
  }>(),
  {
    src: "",
    eager: false,
    size: "card",
  },
);

const status = ref<ImageStatus>(props.src ? "loading" : "error");
const attempt = ref(0);
let retryTimer: ReturnType<typeof setTimeout> | undefined;

const displaySrc = computed(() => {
  if (!props.src) {
    return "";
  }

  if (attempt.value === 0) {
    return props.src;
  }

  try {
    const url = new URL(props.src);
    url.searchParams.set("retry", String(attempt.value));
    return url.toString();
  } catch {
    return props.src;
  }
});

const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?",
);

function clearRetry() {
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = undefined;
  }
}

function handleLoad() {
  clearRetry();
  status.value = "loaded";
}

function handleError() {
  if (!props.src || attempt.value > 0) {
    status.value = "error";
    return;
  }

  status.value = "loading";
  clearRetry();
  retryTimer = setTimeout(() => {
    attempt.value += 1;
  }, 250);
}

watch(
  () => props.src,
  (value) => {
    clearRetry();
    attempt.value = 0;
    status.value = value ? "loading" : "error";
  },
);

onScopeDispose(clearRetry);
</script>

<style scoped>
.character-image {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  background: var(--border);
  font-size: clamp(1.5rem, 6vw, 2.5rem);
}

.character-image--large {
  font-size: clamp(2.5rem, 8vw, 4rem);
}

.character-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.character-image img.is-loaded {
  opacity: 1;
}

.character-image__skeleton {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--border),
    var(--surface),
    var(--border)
  );
}

.character-image__skeleton::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgb(255 255 255 / 6%) 50%,
    transparent 70%
  );
  content: "";
  transform: translateX(-100%);
  animation: character-image-shimmer 1.4s ease-in-out infinite;
}

.character-image__fallback {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 30% 30%, #9bea5f66, transparent 48%),
    linear-gradient(135deg, var(--accent-deep), var(--surface));
  color: var(--accent);
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
}

@keyframes character-image-shimmer {
  to {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .character-image img {
    transition: none;
  }

  .character-image__skeleton::after {
    animation: none;
  }
}
</style>
