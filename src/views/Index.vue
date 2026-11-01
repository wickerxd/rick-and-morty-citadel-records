<template>
  <section class="main_items">
    <section class="hero_section">
      <h2 class="hero_title">
        Explore the <span>Rick and Morty</span> Universe
      </h2>
      <p class="hero-intro">
        Discover characters, episodes and locations across the multiverse.
      </p>

      <section class="action_buttons">
        <ActionButton
          :type="ButtonType.Primary"
          :text="primaryTile"
        ></ActionButton>
        <ActionButton
          :type="ButtonType.Secondary"
          :text="secondaryTile"
        ></ActionButton>
      </section>
    </section>

    <Portal></Portal>
  </section>
</template>

<script setup lang="ts">
import Portal from "@/components/Portal.vue";
import ActionButton from "@/components/ActionButton.vue";
import { ButtonType } from "@/types";
import { ref } from "vue";

const primaryTile = ref("Browse Characters");
const secondaryTile = ref("View Episodes");
</script>
<style scoped>
.main_items {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  justify-content: space-between;

  /* @media (min-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  } */
}
.hero_section {
  display: flex;
  flex-direction: column;

  /* @media (min-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  } */
}

.hero-title {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 64px;
  line-height: 1.05;
  letter-spacing: -1px;
  color: var(--text);
}
.hero-title span {
  color: var(--accent);
}

.hero-intro {
  margin: 0;
  font-size: 18px;
  color: var(--text-muted);
  max-width: 420px;
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 38px;
  }
  .hero-intro {
    font-size: 16px;
  }
}

.action_buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.hero-intro {
  margin: 0;
  font-size: 18px;
  color: var(--text-muted); /* #A7B3C2 */
  max-width: 420px;
}

@media (max-width: 640px) {
  .hero-intro {
    font-size: 16px;
  }
}
</style>
