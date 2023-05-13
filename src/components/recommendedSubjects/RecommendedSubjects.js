import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const RecommendedSubjects = () => {

  return (
    <div className="recommended-parent mt-5">
      <div className="layout-margin px-0">
        <Container>
           <Row>
              <Col lg={12} sm={12}>
                <h2>Recommended subjects</h2>
                <p className="mt-3">
                  To find out more about the information shown here - read about{" "}
                  <a
                    className="text-primary"
                    href="https://www.idp.com/india/help/data-help/"
                  >
                    {" "}
                    How we collect and display course information.
                  </a>{" "}
                  IDP assumes no responsibility or liability for any errors or omissions
                  in the content of this site. We always recommend that you speak to an
                  IDP counsellor to get the latest and most accurate advice.
                </p>
              </Col>
           </Row>
        </Container>
      </div>
    </div>
  );
};

export default RecommendedSubjects;
