import { Container, Grid } from "@mui/material";
import { height } from "@mui/system";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";

export default function GamesPage() {
  const { games } = useAppSelector((state) => state.games);

  return (
    <Container>
      <Grid container sx={{marginTop: 5}} >
        {games &&
          games.map((game) => (
            <Grid item key={game._id} xs={4} >
              <Link to={`/game/${game._id}`}>
                <Grid sx={{
                  borderRadius: 2,
                  margin: 2,
                  padding: 3,
                  backgroundImage: 'linear-gradient(90deg, rgb(12, 237, 147), rgb(13, 200, 220))',
                  minHeight: 50,
                  minWidth: 50,
                }}>{game.name ? game.name : "No name"}</Grid>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
