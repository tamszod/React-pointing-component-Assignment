import { FormControlLabel, Switch } from "@mui/material";
import { useContext } from "react";
import { dataContext } from "../contexts/dataService";
import { errorContext } from "../contexts/errorService";

export function BooleanAspect({ aspect, index }) {
  const { currentFormData, modifyCurrentFormData } = useContext(dataContext);

  const { errors, showError } = useContext(errorContext);

  const handleChange = (e) => {
    modifyCurrentFormData({
      ...currentFormData,
      [aspect.id]:
        currentFormData[aspect.id] === parseInt(aspect.value)
          ? 0
          : parseInt(aspect.value),
    });
  };

  return (
    <div className="aspect">
      <span className="serial">{index + 1}.</span>
      <FormControlLabel
        className="aspectText"
        control={
          <Switch
            color="primary"
            onChange={handleChange}
            id={aspect.id.toString()}
            checked={
              currentFormData[aspect.id] === parseInt(aspect.value)
                ? true
                : false
            }
          />
        }
        label={aspect.name}
        labelPlacement="start"
      />
      <span className="aspectDescription">{aspect.description}</span>
      <span className="error">
        {showError && errors[aspect.id] !== undefined ? errors[aspect.id] : ""}
      </span>
      <br></br>
    </div>
  );
}
