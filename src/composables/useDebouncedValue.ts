import { onScopeDispose, shallowRef, watch, type Ref } from "vue";

export function useDebouncedValue<T>(source: Ref<T>, delay = 350): Ref<T> {
  const debounced = shallowRef(source.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  watch(source, (value) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      debounced.value = value;
    }, delay);
  });

  onScopeDispose(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  return debounced;
}
