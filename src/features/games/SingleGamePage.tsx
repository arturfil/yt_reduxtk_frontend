import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getGameById } from "./gameSlice";

export default function SingleGamePage() {
  const dispatch = useAppDispatch();
  const { singleGame } = useAppSelector((state) => state.games);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      alert("null id");
      return;
    }
    dispatch(getGameById(id));
  }, [id]);

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography sx={{my: 3}} variant="h2">Welcome to this game</Typography>
      <Typography sx={{color: "gray"}} variant="h4" fontWeight={600}>
        {`${singleGame?.address} ${
          singleGame?.time ? `- ${singleGame?.time}h` : ""
        } - ${
          singleGame?.date
            ? (singleGame?.date)
                .toString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")
            : ""
        }`}
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h6">{singleGame?.name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">
            No. Players: {singleGame?.numberOfPeople}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">{singleGame?.time}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to={`/editgame/${singleGame?._id}`}>
            <Button className="green-btn" >
              Edit            
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
