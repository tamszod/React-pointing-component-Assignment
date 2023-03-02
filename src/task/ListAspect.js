import { Select } from "@mui/material";
import { useContext } from "react";
import { dataContext } from "../contexts/dataService";
import { errorContext } from "../contexts/errorService";

export function ListAspect({ aspect, index }) {
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
      <Select
        native
        value={currentFormData[aspect.id]}
        onChange={handleChange}
        id={aspect.id.toString()}
        required={aspect.required}
      >
        <option aria-label="None" value="" />
        {Object.keys(aspect.values).map((key, i) => (
          <option key={key} value={aspect.values[key]}>
            {key}
          </option>
        ))}
      </Select>
      <span className="aspectDescription">{aspect.description}</span>
      <span className="error">
        {showError && errors[aspect.id] !== undefined ? errors[aspect.id] : ""}
      </span>
      <br></br>
    </div>
  );
}
