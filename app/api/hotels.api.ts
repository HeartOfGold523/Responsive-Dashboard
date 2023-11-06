import { Hotel } from "@/types";

const create = () => {
  const getData = async (): Promise<Hotel[]> => {
    const res = await fetch(
      // "https://data.cityofnewyork.us/City-Government/Hotels-Properties-Citywide/tjus-cn27"
      "https://data.cityofnewyork.us/resource/tjus-cn27.json",
      { next: { tags: ["hotels_collection"] } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json() as Promise<Hotel[]>;
  };

  return { getData };
};

export default create();
