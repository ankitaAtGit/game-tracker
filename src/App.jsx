import { Route, Router } from "@solidjs/router";
import Players from "./pages/Player/Players";
import AddPlayer from "./pages/Player/AddPlayer";
import Game from "./pages/Game/Game";
import ScoreBoard from "./pages/ScoreBoard/ScoreBoard";
import Toast from "./components/Toast";
import Logo from "./assets/icon.svg";

const Header = () => {
  return (
    <>
      <div class="toast-container">
        <Toast />
      </div>
      <div class="header">
        <div class="header-wrapper">
          <Logo class="logo" height={50} width={50} />
          <h1>Game Score Tracker</h1>
        </div>
        <p>Manage players, track rounds, and calculate winners</p>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div class="container">
      <Header />
      <div class="main-content">
        <Router>
          <Route path={"/players"} component={Players} />
          <Route
            path={["/add-player", "/edit-player/:id"]}
            component={AddPlayer}
          />

          <Route path={"/"} component={Players} />
        </Router>
        <Game />
        <ScoreBoard />
      </div>
    </div>
  );
};

export default App;
