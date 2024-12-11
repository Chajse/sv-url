import { api } from "$lib/services/data_fetch";
import { writable } from "svelte/store";

export interface Url {
  keyword: string;
  url: string;
  title: string;
  timestamp: Date;
}

function createUrl() {
  const { subscribe, set, update } = writable<Url[]>([]);

  return {
    subscribe,
    fetchUrls: async () => {
      try {
        const response = await api.get("urls");
        if (response.payload) {
          set(response.payload);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  };
}

export const urls = createUrl();
