import * as React from "react";
import Button from "@material-ui/core/Button";

export class Fab extends React.Component {
  state = {
    open: false
  };

  handleMainFabClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div>
        {this.state.open && (
          <div>
            <Button variant="fab" />
            <Button variant="fab" />
            <Button variant="fab" />
          </div>
        )}
        <Button variant="fab" onClick={this.handleMainFabClick} />
      </div>
    );
  }
}

export const FabTest = () => (
  <div>
    <Fab />
  </div>
);
