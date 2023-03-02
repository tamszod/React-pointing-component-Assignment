import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataServiceProvider } from "./contexts/dataService";
import { ErrorServiceProvider } from "./contexts/errorService";
import { PageNavServiceProvider } from "./contexts/pageNavService";

ReactDOM.render(
  <DataServiceProvider>
    <PageNavServiceProvider>
      <ErrorServiceProvider>
        <App />
      </ErrorServiceProvider>
    </PageNavServiceProvider>
  </DataServiceProvider>,
  document.getElementById("root")
);
