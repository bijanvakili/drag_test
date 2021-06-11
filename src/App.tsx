import * as React from "react";

import { WorkspaceComponent } from "./WorkspaceComponent";

interface Props {
  name: string;
}

const App: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="display-1">{props.name}</h1>
        </div>
        <WorkspaceComponent />
      </div>
    </>
  );
};

export default App;
