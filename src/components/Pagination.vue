<template>
  <nav class="pagination" aria-label="Characters pagination">
    <RouterLink
      v-if="page > 1"
      :to="pageLink(page - 1)"
      class="pagination__link pagination__link--wide"
      aria-label="Previous page"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M12 5 7 10l5 5" />
      </svg>
      <span>Previous</span>
    </RouterLink>
    <span
      v-else
      class="pagination__link pagination__link--wide pagination__link--disabled"
      aria-disabled="true"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M12 5 7 10l5 5" />
      </svg>
      <span>Previous</span>
    </span>

    <template v-for="item in pageItems" :key="item">
      <span
        v-if="typeof item === 'string'"
        class="pagination__ellipsis"
        aria-hidden="true"
      >
        …
      </span>
      <span
        v-else-if="item === page"
        class="pagination__link pagination__link--active"
        aria-current="page"
      >
        {{ item }}
      </span>
      <RouterLink
        v-else
        :to="pageLink(item)"
        class="pagination__link"
        :aria-label="`Go to page ${item}`"
      >
        {{ item }}
      </RouterLink>
    </template>

    <RouterLink
      v-if="page < totalPages"
      :to="pageLink(page + 1)"
      class="pagination__link pagination__link--wide"
      aria-label="Next page"
    >
      <span>Next</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m8 5 5 5-5 5" />
      </svg>
    </RouterLink>
    <span
      v-else
      class="pagination__link pagination__link--wide pagination__link--disabled"
      aria-disabled="true"
    >
      <span>Next</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m8 5 5 5-5 5" />
      </svg>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps<{
  page: number;
  totalPages: number;
}>();

const route = useRoute();

type PageItem = number | "start-ellipsis" | "end-ellipsis";

const pageItems = computed<PageItem[]>(() => {
  const total = props.totalPages;

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, props.page - 1);
  const end = Math.min(total - 1, props.page + 1);

  if (start > 2) {
    items.push("start-ellipsis");
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < total - 1) {
    items.push("end-ellipsis");
  }

  items.push(total);
  return items;
});

function pageLink(target: number) {
  return {
    name: "characters",
    query: {
      ...route.query,
      page: target === 1 ? undefined : String(target),
    },
  };
}
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
}

.pagination__link {
  display: inline-flex;
  min-width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding-inline: var(--space-2);
  border: 1px solid transparent;
  border-radius: 10px;
  color: var(--text-muted);
  transition:
    border-color 0.15s,
    background-color 0.15s,
    color 0.15s;
}

.pagination__link:hover {
  border-color: var(--border-strong);
  color: var(--accent);
}

.pagination__link--wide {
  padding-inline: var(--space-3);
}

.pagination__link--active {
  background: var(--surface-active);
  color: var(--accent);
}

.pagination__link--disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.pagination__link--disabled:hover {
  border-color: transparent;
  color: var(--text-muted);
}

.pagination__ellipsis {
  min-width: 24px;
  text-align: center;
  color: var(--text-muted);
}

@media (max-width: 480px) {
  .pagination__link--wide span {
    display: none;
  }

  .pagination__link--wide {
    padding-inline: var(--space-2);
  }
}
</style>
