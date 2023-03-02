import { useState } from "react";
const { createContext } = require("react");

export const pageNavContext = createContext();

const usePageNavService = () => {
  const [pageNum, modifyPageNum] = useState(-1);

  const service = {
    pageNum,
    modifyPageNum,
  };
  return service;
};

export const PageNavServiceProvider = ({ children }) => {
  const service = usePageNavService();
  return (
    <pageNavContext.Provider value={service}>
      {children}
    </pageNavContext.Provider>
  );
};
