'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useRef, useSyncExternalStore } from 'react';

type ParamValue = string | number | boolean | string[] | null | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParamRecord = Record<string, any>;

interface UseUrlParamsOptions<T extends ParamRecord> {
  defaults: T;
  /** Keys that should be treated as arrays */
  arrayKeys?: (keyof T)[];
}

interface UseUrlParamsReturn<T extends ParamRecord> {
  params: T;
  setParam: <K extends keyof T>(key: K, value: T[K]) => void;
  setParams: (updates: Partial<T>) => void;
  resetParams: () => void;
}

function defaultDeserialize(value: string, defaultValue: ParamValue): ParamValue {
  if (typeof defaultValue === 'number') {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  }
  if (typeof defaultValue === 'boolean') {
    return value === 'true';
  }
  return value;
}

// Subscribe to URL changes via popstate
function subscribeToUrl(callback: () => void) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

function getUrlSnapshot() {
  return typeof window !== 'undefined' ? window.location.search : '';
}

function getServerSnapshot() {
  return '';
}

export function useUrlParams<T extends ParamRecord>(options: UseUrlParamsOptions<T>): UseUrlParamsReturn<T> {
  const { defaults, arrayKeys = [] } = options;
  const pathname = usePathname();

  // Stabilize defaults and arrayKeys references
  const defaultsRef = useRef(defaults);
  const arrayKeysRef = useRef(arrayKeys);

  // Track URL changes without Next.js router
  const searchString = useSyncExternalStore(subscribeToUrl, getUrlSnapshot, getServerSnapshot);

  // Parse current URL params into typed object
  const params = useMemo(() => {
    const searchParams = new URLSearchParams(searchString);
    const result = { ...defaultsRef.current };
    for (const key of Object.keys(defaultsRef.current) as (keyof T)[]) {
      const keyStr = String(key);

      // Handle array keys
      if (arrayKeysRef.current.includes(key)) {
        const values = searchParams.getAll(keyStr);
        result[key] = values as T[keyof T];
      } else {
        const urlValue = searchParams.get(keyStr);
        if (urlValue !== null) {
          result[key] = defaultDeserialize(urlValue, defaultsRef.current[key]) as T[keyof T];
        }
      }
    }
    return result;
  }, [searchString]);

  // Build URL search string from params
  const buildSearchString = useCallback((newParams: T): string => {
    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(newParams)) {
      const isArrayKey = arrayKeysRef.current.includes(key as keyof T);

      if (isArrayKey && Array.isArray(value)) {
        // Handle array values - append each value separately
        if (value.length > 0) {
          value.forEach((v) => urlParams.append(key, String(v)));
        }
      } else {
        // Handle scalar values
        const defaultValue = defaultsRef.current[key as keyof T];
        const isDefault =
          value === defaultValue ||
          (typeof defaultValue === 'number' && value === defaultValue) ||
          value === '' ||
          value === null ||
          value === undefined;

        if (!isDefault) {
          urlParams.set(key, String(value));
        }
      }
    }
    return urlParams.toString();
  }, []);

  // Update URL without triggering Next.js navigation
  const updateUrl = useCallback(
    (search: string) => {
      const newUrl = `${pathname}${search ? `?${search}` : ''}`;
      window.history.replaceState(null, '', newUrl);
      // Manually trigger re-render by dispatching a custom event
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
    [pathname],
  );

  const setParam = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      const currentParams = { ...params, [key]: value };
      // Reset page to 1 when filters change (except when changing page itself)
      if (key !== 'page' && 'page' in currentParams) {
        (currentParams as ParamRecord).page = 1;
      }
      const search = buildSearchString(currentParams);
      updateUrl(search);
    },
    [params, buildSearchString, updateUrl],
  );

  const setParams = useCallback(
    (updates: Partial<T>) => {
      const newParams = { ...params, ...updates };
      const search = buildSearchString(newParams);
      updateUrl(search);
    },
    [params, buildSearchString, updateUrl],
  );

  const resetParams = useCallback(() => {
    updateUrl('');
  }, [updateUrl]);

  return { params, setParam, setParams, resetParams };
}
