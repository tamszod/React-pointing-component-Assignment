import { BooleanAspect } from "./BooleanAspect";
import { ListAspect } from "./ListAspect";
import { NumberAspect } from "./NumberAspect";
import { pageNavContext } from "../contexts/pageNavService";
import { useContext, useEffect } from "react";

export function Task({ tasks, index, checkValues }) {
  const { modifyPageNum } = useContext(pageNavContext);

  useEffect(() => {
    modifyPageNum(parseInt(index));
  }, []);

  useEffect(() => {
    checkValues();
  }, [ListAspect, NumberAspect, BooleanAspect]);

  return (
    <div className="task">
      <h3>{tasks.name}</h3>
      {tasks.aspects.length === 0 ? (
        <p>No avaible aspects for this task!</p>
      ) : (
        tasks.aspects.map((aspect, i) =>
          aspect.type === "list" ? (
            <ListAspect key={aspect.id} aspect={aspect} index={i} />
          ) : aspect.type === "number" ? (
            <NumberAspect key={aspect.id} aspect={aspect} index={i} />
          ) : (
            <BooleanAspect key={aspect.id} aspect={aspect} index={i} />
          )
        )
      )}
    </div>
  );
}
