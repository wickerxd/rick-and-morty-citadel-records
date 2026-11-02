import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { api, ApiError, type QueryParams } from "./client";
import type {
  Character,
  CharacterFilters,
  Episode,
  Location,
  PaginatedResponse,
} from "@/types";

const EMPTY_PAGE: PaginatedResponse<never> = {
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
};

export const queryKeys = {
  characters: (filters: CharacterFilters, page: number) =>
    ["characters", filters, page] as const,
  character: (id: number | null | undefined) => ["character", id] as const,
  allEpisodes: ["episodes", "all"] as const,
  allLocations: ["locations", "all"] as const,
};

async function fetchPage<T>(
  path: string,
  params: QueryParams,
  signal?: AbortSignal,
): Promise<PaginatedResponse<T>> {
  try {
    return await api.get<PaginatedResponse<T>>(path, { params, signal });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return EMPTY_PAGE as PaginatedResponse<T>;
    }
    throw error;
  }
}

async function fetchAllPages<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T[]> {
  const firstPage = await fetchPage<T>(path, { page: 1 }, signal);
  const remainingPages = Math.max(firstPage.info.pages - 1, 0);

  if (remainingPages === 0) {
    return firstPage.results;
  }

  const pages = await Promise.all(
    Array.from({ length: remainingPages }, (_, index) =>
      fetchPage<T>(path, { page: index + 2 }, signal),
    ),
  );

  return [firstPage, ...pages].flatMap((page) => page.results);
}

export function useCharactersPage(
  filters: MaybeRefOrGetter<CharacterFilters> = {},
  page: MaybeRefOrGetter<number> = 1,
) {
  return useQuery({
    queryKey: computed(() =>
      queryKeys.characters(toValue(filters), toValue(page)),
    ),
    queryFn: ({ signal }) => {
      const { name, status } = toValue(filters);
      return fetchPage<Character>(
        "character",
        { name, status, page: toValue(page) },
        signal,
      );
    },
  });
}

export function useCharacter(
  id: MaybeRefOrGetter<number | null | undefined>,
) {
  return useQuery({
    queryKey: computed(() => queryKeys.character(toValue(id))),
    queryFn: ({ signal }) =>
      api.get<Character>(`character/${toValue(id)}`, { signal }),
    enabled: computed(() => {
      const value = toValue(id);
      return typeof value === "number" && Number.isInteger(value) && value > 0;
    }),
  });
}

export function useAllEpisodes() {
  return useQuery({
    queryKey: queryKeys.allEpisodes,
    queryFn: ({ signal }) => fetchAllPages<Episode>("episode", signal),
  });
}

export function useAllLocations() {
  return useQuery({
    queryKey: queryKeys.allLocations,
    queryFn: ({ signal }) => fetchAllPages<Location>("location", signal),
  });
}
