import { TextField } from "@mui/material";
import { useContext } from "react";
import { dataContext } from "../contexts/dataService";
import { errorContext } from "../contexts/errorService";

export function NumberAspect({ aspect, index }) {
  const { currentFormData, modifyCurrentFormData } = useContext(dataContext);
  const { errors, showError } = useContext(errorContext);

  const handleChange = (e) => {
    modifyCurrentFormData({
      ...currentFormData,
      [e.target.id]: e.target.value !== "" ? parseInt(e.target.value) : "",
    });
  };

  return (
    <div className="aspect">
      <span className="serial">{index + 1}.</span>
      <span className="aspectText">
        {aspect.name + (aspect.required ? "*" : "")}
      </span>
      <span className="numberOption">
        <TextField
          className="numberSize"
          required={aspect.required}
          value={currentFormData[aspect.id]}
          onChange={handleChange}
          id={aspect.id.toString()}
          label="Score"
          type="number"
        />
      </span>
      <span className="max">/{aspect.maxValue}</span>
      <span className="aspectDescription">{aspect.description}</span>
      <span className="error">
        {showError && errors[aspect.id] !== undefined ? errors[aspect.id] : ""}
      </span>
      <br></br>
    </div>
  );
}
