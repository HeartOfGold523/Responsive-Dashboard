import React from "react";
import { Box, Stack } from "@mui/material";

import {
  HotelsBarChart,
  HotelsDataTable,
  HotelsPieChart,
  HotelsToolbar,
} from "@/components";

const Home = (): JSX.Element => {
  return (
    <main>
      <Stack spacing={2} sx={styles.stack}>
        <HotelsToolbar />
        <Box sx={styles.box}>
          <HotelsPieChart />
          <HotelsBarChart />
        </Box>
        <Box>
          <HotelsDataTable />
        </Box>
      </Stack>
    </main>
  );
};

const styles = {
  stack: {
    width: "100%",
    maxWidth: "1280px",
    m: "0 auto",
    p: 2,
  },
  box: {
    display: "flex",
    flexDirection: { xs: "column-reverse", md: "row" },
    gap: 2,
  },
};

export default Home;
