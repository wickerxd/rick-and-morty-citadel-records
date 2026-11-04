<template>
  <div class="error-state" role="alert">
    <p>{{ message }}</p>
    <ActionButton
      :type="ButtonType.Secondary"
      :disabled="retrying"
      :text="retrying ? 'Trying again…' : 'Try again'"
      @click="emit('retry')"
    />
  </div>
</template>

<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import { ButtonType } from "@/types";

withDefaults(
  defineProps<{
    message: string;
    retrying?: boolean;
  }>(),
  {
    retrying: false,
  },
);

const emit = defineEmits<{ retry: [] }>();
</script>

<style scoped>
.error-state {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  padding-block: var(--space-5);
  color: var(--status-dead);
}

.error-state :deep(.btn) {
  border-color: var(--status-dead);
  color: var(--status-dead);
}

.error-state :deep(.btn:hover:not(:disabled)) {
  border-color: var(--status-dead);
  background: var(--status-dead);
  color: var(--on-accent);
}
</style>
