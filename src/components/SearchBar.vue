<template>
  <form class="search" role="search" @submit.prevent>
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m13.5 13.5 4 4" />
    </svg>
    <input
      :id="inputId"
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-label="placeholder"
      autocomplete="off"
      @input="onInput"
    />
  </form>
</template>

<script setup lang="ts">
import { useId } from "vue";

defineProps<{
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const inputId = useId();

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search svg {
  position: absolute;
  left: var(--space-4);
  color: var(--text-muted);
  pointer-events: none;
}

.search input {
  width: 100%;
  height: 48px;
  padding: 0 var(--space-4) 0 46px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
}

.search input::placeholder {
  color: var(--text-muted);
}

.search input:hover {
  border-color: var(--border-strong);
}

.search input:focus-visible {
  border-color: var(--accent);
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
