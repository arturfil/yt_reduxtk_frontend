import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createGame, deleteGame, filterGame, getGameById, updateGame } from "./gameSlice";

export default function EditGamePage() {
  const dispatch = useAppDispatch();
  const { singleGame } = useAppSelector((state) => state.games);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGameById(id!));
  }, []);

  useEffect(() => {
    setGameInitialState();
  }, [singleGame]);

  const [game, setGame] = useState({
    name: "",
    address: "",
    numberOfPeople: "",
    date: "",
    time: "",
    fieldNumber: "",
  });

  const setGameInitialState = () => {
    if (!singleGame) return; // if null, return
    setGame({
      name: singleGame?.name,
      address: singleGame?.address,
      numberOfPeople: singleGame?.numberOfPeople.toString()!,
      date: singleGame?.date.toString(),
      time: singleGame?.time,
      fieldNumber: singleGame?.fieldNumber.toString()!,
    });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let data = {
      _id: id,
      name: game.name,
      address: game.address,
      numberOfPeople: parseInt(game.numberOfPeople),
      time: game.time,
      date: game.date,
      fieldNumber: parseInt(game.fieldNumber),
    };
    dispatch(updateGame(data))
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (!id) return;
    dispatch(deleteGame(id));
    // filterGame(id);
    navigate("/")
  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid sx={{ margin: "0 auto" }}>
        <Typography sx={{ marginBottom: 2 }} variant="h4" fontWeight={600}>
          {game.name} - {game.address} - {game.time} -{" "}
          {game.date?.substring(0, 10).replaceAll("-", "/")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setGame({ ...game, name: e.target.value })}
              value={game.name}
              fullWidth
              label="name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={(e) => setGame({ ...game, address: e.target.value })}
              value={game.address}
              fullWidth
              label="address"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="number"
              onChange={(e) =>
                setGame({ ...game, numberOfPeople: e.target.value })
              }
              value={game.numberOfPeople}
              fullWidth
              label="numberOfPeople"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              defaultValue={game.date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setGame({ ...game, date: e.target.value })}
              type="date"
              value={game.date}
              fullWidth
              label={`Current Date:     ${game.date.substring(0,10).replaceAll("-", "/").split("/").reverse().join("/")}`}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={(e) => setGame({ ...game, time: e.target.value })}
              value={game.time}
              fullWidth
              label="time"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="number"
              onChange={(e) =>
                setGame({ ...game, fieldNumber: e.target.value })
              }
              value={game.fieldNumber}
              fullWidth
              label="fieldNumber"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              disableElevation
            >
              Update
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleDelete}
              sx={{backgroundColor: "#ff5544"}}
              fullWidth
              variant="contained"
              disableElevation
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
