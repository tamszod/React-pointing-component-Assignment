import { Button, ButtonGroup } from "@mui/material";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { dataContext } from "../contexts/dataService";
import Navbar from "../menu/Navbar";
import { Task } from "../task/Task";
import "../style.css";
import { pageNavContext } from "../contexts/pageNavService";

export function ScoringComponent({ onSubmit, onCancel, checkValues }) {
  const { data, getMaxScore, getCurrentScore } = useContext(dataContext);
  const { pageNum } = useContext(pageNavContext);
  const maxScore = getMaxScore();
  let currentScore = getCurrentScore();

  if (data.tasks.length === 0) {
    return (
      <>
        <h1>Scoring Component</h1>
        <h2>{data.name}</h2>
        <p>There is not data to show!</p>
      </>
    );
  }

  return (
    <>
      <h1>Scoring Component</h1>
      <h2>{data.name}</h2>
      <Router key="router">
        <Navbar key="nav" />
        <Routes key="routes">
          <Route path="/" key="score" /*element={<Score />}*/></Route>
          {data.tasks.map((task, i) => (
            <Route
              key={i}
              path={i.toString()}
              element={
                <Task
                  key={task.name}
                  tasks={task}
                  index={i}
                  checkValues={checkValues}
                />
              }
            />
          ))}
        </Routes>
        <p className="scoreP">
          Score: {currentScore}/{maxScore}
        </p>
        <ButtonGroup
          aria-label="outlined primary button group"
          size="large"
          className="buttonGroup"
        >
          <Button color="secondary" disabled={!(pageNum > 0)} variant="">
            <Link to={"/" + (pageNum - 1).toString()}>Previous</Link>
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => onSubmit()}
          >
            Submit
          </Button>
          <Button variant="contained" color="error" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            color="secondary"
            variant=""
            disabled={!(pageNum < data.tasks.length - 1)}
          >
            <Link to={"/" + (pageNum + 1).toString()}>Next</Link>
          </Button>
        </ButtonGroup>
      </Router>
    </>
  );
}
