<template>
  <button class="btn" :class="classType">
    {{ text }}
    <svg
      v-if="type === ButtonType.Primary"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="M4 10h12M11 5l5 5-5 5"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ButtonType } from "@/types";
import { computed } from "vue";

interface Props {
  type: ButtonType;
  text: string;
}
const props = defineProps<Props>();

const classType = computed(() => {
  return props.type === ButtonType.Primary ? "btn-primary" : "btn-secondary";
});
</script>

<style>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 52px;
  padding: 0 28px;
  border-radius: 999px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.15s,
    border-color 0.15s,
    color 0.15s;
}

.btn:focus-visible,
.back-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.btn-primary {
  background: var(--accent);
  color: var(--on-accent);
  border: 1px solid var(--accent);
}
.btn-primary:hover {
  background: #b3f283;
  border-color: #b3f283;
  color: var(--on-accent);
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-strong);
  color: var(--text);
}
.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  color: var(--text-muted);
}
.back-link:hover {
  color: var(--accent);
}

@media (max-width: 640px) {
  .btn {
    padding: 0 22px;
  }
}
</style>
