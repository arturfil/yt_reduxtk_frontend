import { Container, Grid, Typography } from "@mui/material";
import { height } from "@mui/system";
import { Link } from "react-router-dom";
import GameCard from "../../components/general/GameCard";
import { useAppSelector } from "../../store/store";

export default function GamesPage() {
  const { games } = useAppSelector((state) => state.games);

  return (
    <Container>
      <Typography variant="h2" fontWeight={'bold'} sx={{mt: 5}}>Games</Typography>
      <Grid container spacing={3} sx={{marginTop: 5}} >
        {games &&
          games.map((game) => (
            <Grid item key={game._id} xs={4} >
              <Link to={`/game/${game._id}`}>
                <GameCard game={game}/>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
