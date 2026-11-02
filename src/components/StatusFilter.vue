<template>
  <label class="status-filter">
    <span class="sr-only">Filter characters by status</span>
    <select
      class="status-filter__select"
      :value="modelValue"
      @change="onChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="m5 7 5 5 5-5" />
    </svg>
  </label>
</template>

<script setup lang="ts">
import { CHARACTER_STATUSES, type CharacterStatusFilter } from "@/types";

defineProps<{ modelValue: CharacterStatusFilter }>();

const emit =
  defineEmits<{ "update:modelValue": [value: CharacterStatusFilter] }>();

const options: { value: CharacterStatusFilter; label: string }[] = [
  { value: "All", label: "All" },
  ...CHARACTER_STATUSES.map((status) => ({
    value: status,
    label: status === "unknown" ? "Unknown" : status,
  })),
];

function onChange(event: Event) {
  emit(
    "update:modelValue",
    (event.target as HTMLSelectElement).value as CharacterStatusFilter,
  );
}
</script>

<style scoped>
.status-filter {
  position: relative;
  display: inline-flex;
}

.status-filter__select {
  height: 44px;
  min-width: 130px;
  appearance: none;
  padding: 0 40px 0 var(--space-4);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}

.status-filter__select:hover {
  border-color: var(--border-strong);
}

.status-filter svg {
  position: absolute;
  top: 50%;
  right: 14px;
  color: var(--text-muted);
  pointer-events: none;
  transform: translateY(-50%);
}
</style>
