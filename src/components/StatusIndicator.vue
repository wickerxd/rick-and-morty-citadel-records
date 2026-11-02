<template>
  <span class="status" :class="statusClass">
    <span class="status__dot" aria-hidden="true"></span>
    <span>{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CharacterStatus } from "@/types";

const props = defineProps<{ status: CharacterStatus }>();

const label = computed(() =>
  props.status === "unknown" ? "Unknown" : props.status,
);

const statusClass = computed(() => `status--${props.status.toLowerCase()}`);
</script>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
}

.status__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.status--dead .status__dot {
  background: var(--status-dead);
}

.status--unknown .status__dot {
  background: var(--status-unknown);
}
</style>
