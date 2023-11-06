"use server";
import { revalidateTag } from "next/cache";

import { hotelsApi } from "./api";
import { Hotel } from "@/types";

type HotelCollectionPromise = {
  data: Hotel[];
  error: boolean;
};

export const fetchHotelCollection =
  async (): Promise<HotelCollectionPromise> => {
    try {
      const data = await hotelsApi.getData();
      return { data: data, error: false };
    } catch (e) {
      return { data: [], error: true };
    }
  };

export const refreshHotelCollection = async (): Promise<void> => {
  revalidateTag("hotels_collection");
};
