import { useContext, useEffect } from "react";
import { dataContext } from "./contexts/dataService";
import { errorContext } from "./contexts/errorService";
import { ScoringComponent } from "./scoring/ScoringComponent";

function App() {
  const { data, currentFormData, getResultsJson } = useContext(dataContext);

  const { errors, setErrors, setNumErrors, setNumCorrect, setShowError } =
    useContext(errorContext);

  useEffect(() => {
    checkValues();
  }, []);

  const checkValues = () => {
    const newErrors = {};
    const correct = {};
    const wrong = {};
    data.tasks.forEach((task, i) => {
      correct[i] = 0;
      wrong[i] = 0;
      task.aspects.forEach((aspect) => {
        if (aspect.required && currentFormData[aspect.id] === "") {
          wrong[i]++;
          newErrors[aspect.id] = "Cannot stay empty!";
        } else if (
          aspect.type === "number" &&
          (currentFormData[aspect.id] < 0 ||
            currentFormData[aspect.id] > parseInt(aspect.maxValue))
        ) {
          newErrors[aspect.id] = "The given number is out of range!";
          wrong[i] = 1 + wrong[i];
        } else {
          correct[i] = 1 + correct[i];
        }
      });
    });
    setErrors(newErrors);
    setNumCorrect(correct);
    setNumErrors(wrong);
  };

  const onSubmit = (e) => {
    setShowError(true);
    checkValues();
    if (Object.values(errors).length > 0) {
      return;
    }
    console.log(getResultsJson());
    window.localStorage.setItem("solution", JSON.stringify(getResultsJson()));
  };

  const onCancel = (e) => {
    console.log(getResultsJson());
    window.localStorage.setItem("solution", JSON.stringify(getResultsJson()));
  };

  return (
    <ScoringComponent
      onSubmit={onSubmit}
      onCancel={onCancel}
      checkValues={checkValues}
    />
  );
}

export default App;
