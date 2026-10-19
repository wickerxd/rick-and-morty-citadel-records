<template>
  <header>Home</header>

  <section v-if="episodes.length > 0">
    <div v-for="char in episodes">
      {{ char.name }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const episodes = ref<Record<string, unknown>[]>([]);

// TODO composable or utils
const doGetEpisodes = fetch("https://rickandmortyapi.com/api/episode")
  .then((items) => {
    return items.json();
  })
  .then((val) => {
    episodes.value = val.results;
  });
</script>

<style scoped></style>
