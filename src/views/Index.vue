<template>
  <section class="main_items">
    <ActionButton :type="ButtonType.Primary"></ActionButton>
    <ActionButton :type="ButtonType.Secondary"></ActionButton>
    <Portal></Portal>
  </section>
</template>

<script setup lang="ts">
import Portal from "@/components/Portal.vue";
import ActionButton from "@/components/ActionButton.vue";
import { ButtonType } from "@/types";
import { ref } from "vue";
</script>
<style scoped>
.main_items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
