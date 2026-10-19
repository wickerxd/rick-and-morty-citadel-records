<template>
  <button class="btn" :class="classType">Hello</button>
</template>

<script setup lang="ts">
import { ButtonType } from "@/types";
import { computed } from "vue";

interface Props {
  type: ButtonType;
}
const props = defineProps<Props>();

const classType = computed(() => {
  return props.type === ButtonType.Primary ? "btn-primary" : "btn-secondary";
});
</script>

<style scoped>
.btn {
  height: 52px;
  padding: 0 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}
.btn-primary {
  background: var(--accent);
  color: var(--on-accent);
}
.btn-secondary {
  border: 1px solid var(--border-strong);
  color: var(--text);
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  color: var(--text-muted);
}
</style>
