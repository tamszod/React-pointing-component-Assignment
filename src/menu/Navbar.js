import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../contexts/dataService";
import { errorContext } from "../contexts/errorService";
import { pageNavContext } from "../contexts/pageNavService";

function Navbar() {
  const { data } = useContext(dataContext);

  const { pageNum } = useContext(pageNavContext);

  const { numCorrect, numErrors } = useContext(errorContext);

  return (
    <>
      <div className="navbar">
        {data.tasks.map((task, i) => (
          <Link key={i} to={i.toString()}>
            <button className={i === pageNum ? "focusedButton" : "basicButton"}>
              {task.name +
                "(" +
                (numCorrect[i] === 0 ? "" : numCorrect[i] + "✅") +
                (numErrors[i] === 0 ? "" : numErrors[i] + "❗") +
                "/" +
                (numCorrect[i] + numErrors[i]) +
                ")"}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;
