<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :type="to ? undefined : 'button'"
    :disabled="to ? undefined : disabled"
    :class="['btn', classType]"
    @click="onClick"
  >
    <span>{{ text }}</span>
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
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { ButtonType } from "@/types";

const props = withDefaults(
  defineProps<{
    type?: ButtonType;
    text: string;
    to?: RouteLocationRaw;
    disabled?: boolean;
  }>(),
  {
    type: ButtonType.Primary,
    disabled: false,
  },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const classType = computed(() =>
  props.type === ButtonType.Primary ? "btn-primary" : "btn-secondary",
);

function onClick(event: MouseEvent) {
  emit("click", event);
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  height: 52px;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 0 28px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-weight: 500;
  transition:
    background-color 0.15s,
    border-color 0.15s,
    color 0.15s,
    opacity 0.15s;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-primary {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
}

.btn-primary:hover:not(:disabled) {
  border-color: #b3f283;
  background: #b3f283;
  color: var(--on-accent);
}

.btn-secondary {
  border-color: var(--border-strong);
  background: transparent;
  color: var(--text);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 640px) {
  .btn {
    padding: 0 22px;
  }
}
</style>
