import * as React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  name: string;
}

class App extends React.Component<Props> {
  render(): React.ReactElement {
    const { name } = this.props;
    return (
      <>
        <h1>Hello {name}</h1>
        <button type="button" className="btn btn-primary">
          This is a bootstrap button
        </button>
      </>
    );
  }
}

export default App;
