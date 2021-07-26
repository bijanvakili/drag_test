import * as React from "react";
import { ApiContext, Api } from "./api";
import { WorkspaceComponent } from "./WorkspaceComponent";

interface Props {
  name: string;
}

const contextData = {
  api: new Api(),
};

const App: React.FC<Props> = (props: Props) => {
  return (
    <ApiContext.Provider value={contextData}>
      <div className="container">
        <div className="row">
          <h1 className="display-1">{props.name}</h1>
        </div>
        <WorkspaceComponent />
      </div>
    </ApiContext.Provider>
  );
};

export default App;
