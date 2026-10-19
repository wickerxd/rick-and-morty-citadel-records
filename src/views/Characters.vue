<template>
  <header>Home</header>

  <section class="character_list" v-if="data.results.length > 0">
    <character-card
      v-for="(char, index) in data.results"
      :key="index"
      :character="char"
    ></character-card>
  </section>
</template>

<script setup lang="ts">
import { api } from "@/api/client";
import CharacterCard from "@/components/CharacterCard.vue";
import type { Character } from "@/types";
import { useQuery } from "@tanstack/vue-query";
import { onMounted, ref } from "vue";

const characters = ref<Character[]>([]);
const { isPending, isError, data, error } = useQuery({
  queryKey: ["todos"],
  queryFn: useCharacters,
});

function useCharacters() {
  return api.get("character");
}
</script>

<style scoped>
.character_list {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  row-gap: 1rem;
}

@media (min-width: 320px) {
  .character_list {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 1rem;
  }
}

@media (min-width: 640px) {
  .character_list {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 1rem;
  }
}

@media (min-width: 900px) {
  .character_list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 1rem;
  }
}
@media (min-width: 1280px) {
  .character_list {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    row-gap: 1rem;
  }
}
</style>
