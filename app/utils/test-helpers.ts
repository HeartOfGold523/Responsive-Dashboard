import { Hotel } from "@/types";

export const generateHotelCollection = () => {
  const hotels = [
    {
      parid: 1,
      borocode: 1,
      block: 1,
      lot: 1,
      taxyear: 2023,
      street_num: "test street_num 1",
      street_name: "test street_name 1",
      postcode: "11111",
      bldg_class: "test bldg_class 1",
      taxclass: 1,
      owner_name: "test owner_name 1",
      borough: "test borough 1",
      latitude: 1,
      longitude: 1,
      community_board: 1,
      council_district: "test council_district 1",
      census_tract: 1,
      bin: 1,
      bbl: 1,
      nta: "test nta 1",
    },
    {
      parid: 2,
      borocode: 2,
      block: 2,
      lot: 2,
      taxyear: 2023,
      street_num: "test street_num 2",
      street_name: "test street_name 2",
      postcode: "22222",
      bldg_class: "test bldg_class 2",
      taxclass: 2,
      owner_name: "test owner_name 2",
      borough: "test borough 2",
      latitude: 2,
      longitude: 2,
      community_board: 2,
      council_district: "test council_district 2",
      census_tract: 2,
      bin: 2,
      bbl: 2,
      nta: "test nta 2",
    },
  ] as Hotel[];

  return {
    data: hotels,
    error: false,
  };
};
