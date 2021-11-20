import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

const HomeContents = props => {
  return (
    <div className="col-md-8 offset-md-2 mt-5">
      <Jumbotron fluid>
        <Container>
          <h1>Welcome to MV Pricing</h1>
          <hr>
          </hr>
          <p>
            Create Your Own Custom Plans,Products and Bundles
            To sell On The GO!
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default HomeContents;
