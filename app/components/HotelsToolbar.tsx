"use client";
import React from "react";
import {
  CircularProgress,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Replay from "@mui/icons-material/Replay";

import { useHotels } from "../contexts";

const HotelsToolbar = (): JSX.Element => {
  const {
    state: { loading, error },
    dispatch,
  } = useHotels();

  const handleClick = () => {
    dispatch({ type: "refresh" });
  };

  return (
    <Toolbar component={Paper} disableGutters sx={styles.toolbar}>
      <Typography variant="h6" sx={styles.toolbarTitle}>
        {"NYC Hotels"}
      </Typography>
      {loading ? (
        <CircularProgress size={20} sx={styles.progress} />
      ) : (
        <Tooltip title={"Refresh Data"}>
          <IconButton disabled={loading} onClick={handleClick}>
            <Replay />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const styles = {
  toolbar: {
    gap: 1,
    p: 2,
    bgcolor: "rgba(255, 255, 255, 0.8)",
  },
  toolbarTitle: {
    flex: "1 1 100%",
  },
  progress: {
    m: "10px",
  },
};

export default HotelsToolbar;
