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

export const generateDataChartParams = () => {
  return {
    line: {
      height: 10,
      series: [
        { data: [3, 4, 1, 6, 5], label: "A", stack: "total" },
        { data: [4, 3, 1, 5, 8], label: "B", stack: "total" },
        { data: [4, 2, 5, 4, 1], label: "C", stack: "total" },
      ],
    },
    bar: {
      height: 10,
      series: [
        { data: [3, 4, 1, 6, 5], label: "A" },
        { data: [4, 3, 1, 5, 8], label: "B" },
        { data: [4, 2, 5, 4, 1], label: "C" },
      ],
    },
    scatter: {
      height: 10,
      series: [
        {
          data: [
            { x: 6.5e-2, y: -1.3, id: 0 },
            { x: -2.1, y: -7.0e-1, id: 1 },
            { x: -7.6e-1, y: -6.7e-1, id: 2 },
          ],
          label: "A",
        },
        {
          data: [
            { x: 1.8, y: -1.7e-2, id: 0 },
            { x: 7.1e-1, y: 2.6e-1, id: 1 },
            { x: -1.2, y: 9.8e-1, id: 2 },
          ],
          label: "B",
        },
      ],
    },
    pie: {
      height: 10,
      series: [
        {
          data: [{ value: 5 }, { value: 10 }, { value: 15 }],
          label: "Series 1",
          outerRadius: 80,
          highlighted: { additionalRadius: 10 },
        },
        {
          data: [{ value: 5 }, { value: 10 }, { value: 15 }],
          label: "Series 1",
          innerRadius: 90,
          highlighted: { additionalRadius: 10 },
        },
      ],
    },
  };
};
