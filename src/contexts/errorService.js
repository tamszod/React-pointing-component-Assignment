import { useState } from "react";
const { createContext } = require("react");

export const errorContext = createContext();

const useErrorService = () => {
  const [errors, setErrors] = useState({});
  const [numErrors, setNumErrors] = useState({});
  const [numCorrect, setNumCorrect] = useState({});
  const [showError, setShowError] = useState(false);

  const service = {
    errors,
    setErrors,
    numErrors,
    setNumErrors,
    numCorrect,
    setNumCorrect,
    showError,
    setShowError,
  };
  return service;
};

export const ErrorServiceProvider = ({ children }) => {
  const service = useErrorService();
  return (
    <errorContext.Provider value={service}>{children}</errorContext.Provider>
  );
};
