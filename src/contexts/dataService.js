import { useState } from "react";
import json_data from "../stories/example-data/the-example.json";

const { createContext } = require("react");

export const dataContext = createContext();

const useDataService = () => {
  const [data, modifyData] = useState(json_data);
  const tmpFormData = {};

  data.tasks.forEach((task) => {
    task.aspects.forEach((aspect) => {
      tmpFormData[aspect.id] = "";
    });
  });

  const [currentFormData, modifyCurrentFormData] = useState(tmpFormData);

  const [score, setScore] = useState(0);
  const getMaxScore = () => {
    let maxScore = 0;
    data.tasks.forEach((task) => {
      task.aspects.forEach((aspect) => {
        if (aspect.type === "list") {
          maxScore += Object.values(aspect.values).reduce((a, b) => {
            return Math.max(a, b);
          });
        } else if (aspect.type === "number") {
          maxScore += aspect.maxValue;
        } else if (aspect.type === "boolean") {
          maxScore += aspect.value;
        }
      });
    });
    return maxScore;
  };

  const getCurrentScore = () => {
    let scoreSum = 0;
    Object.values(currentFormData).forEach((score) => {
      if (score !== "") {
        scoreSum += score;
      }
    });
    return scoreSum;
  };

  const getResultsJson = () => {
    const results = { results: [] };
    Object.keys(currentFormData).forEach((key) => {
      results.results.push({
        id: key,
        value: currentFormData[key] === "" ? 0 : currentFormData[key],
      });
    });
    return results;
  };

  const service = {
    data,
    modifyData,
    currentFormData,
    modifyCurrentFormData,
    getMaxScore,
    getCurrentScore,
    getResultsJson,
  };

  return service;
};

export const DataServiceProvider = ({ children }) => {
  const service = useDataService();
  return (
    <dataContext.Provider value={service}>{children}</dataContext.Provider>
  );
};
