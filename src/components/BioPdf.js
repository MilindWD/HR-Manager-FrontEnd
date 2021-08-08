import React, { Component } from "react";

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Doc from "../components/DocServiceBio";
import PdfContainer from "../components/PdfContainer";

import { Button, Col, Container, Row } from "react-bootstrap";


export default class Export extends Component {
  constructor(props) {
    super(props);
  }
  createPdf = (html, id) => Doc.createPdf(html, this.props.data.name);

  printDocument(name = null) {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        format: "a4",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(name ? `${this.props.data.name}.pdf` : "download.pdf");
    });
  }


  render() {
    return (
      <div>
        <div style={{ borderTop: "1px solid LightGray", borderBottom: "1px solid LightGray"}}>
          <PdfContainer
            createPdf={(e) => {
              this.createPdf(e, this.props.id);
            }}
          >
            <div
              id="divToPrint"
              className="mt4"
              style={{ width: "210mm", height: "297mm" }}
            >
              {
                <Container
                  style={{ width: "200mm", height: "290mm" }}
                  className="py-2"
                >
                  <Container>
                    <div style={{ textAlign: "center" }} className="my-3">
                      <h4>Health and Wellness Health Care Services</h4>
                    </div>
                    <hr></hr>
                    <Container >
                    <div style={{ textAlign: "center" }}><h5 >Bio Data</h5></div>
                    <hr style={{width: "0mm", margin: "auto", marginBottom: "8mm"}}></hr>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Name
                        </Col>
                        <Col xs={6}>{this.props.data.name}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Father's / Husband's Name
                        </Col>
                        <Col xs={6}>{this.props.data.fatherName?this.props.data.fatherName: this.props.data.husbandName}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Address
                        </Col>
                        <Col xs={6}> {this.props.data.address}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Mobile Number
                        </Col>
                        <Col xs={6}>{this.props.data.mobile}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Date of Birth
                        </Col>
                        <Col xs={6}>{this.props.data.dob==="Invalid date"?"":this.props.data.dob}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Age
                        </Col>
                        <Col xs={6}>{this.props.data.age}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Sex
                        </Col>
                        <Col xs={6}>{this.props.sex}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Caste 
                        </Col>
                        <Col xs={6}>{this.props.data.caste}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Marital Status
                        </Col>
                        <Col xs={6}>{this.props.maritalStatus}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Languages
                        </Col>
                        <Col xs={6}>{this.props.data.languages}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Education
                        </Col>
                        <Col xs={6}>{this.props.data.education}</Col>
                      </Row>
                      <Row className="py-3">
                        <Col xs={6} className="bio-left">
                          Work Experience
                        </Col>
                        <Col xs={6}>{this.props.data.workExperience}</Col>
                      </Row>
                    </Container>
                  <hr></hr>
                  <h6 style={{textAlign: "center" }}>Declaration</h6>
                  <p style={{textAlign: "center"}}>I confirm that the given above is true and complete to the best of my knowledge and belief.</p>
                  <div style={{fontWeight: "600"}} className="py-2">Date: </div>
                  <div style={{fontWeight: "600"}} className="py-2">Place: </div>
                  <div style={{fontWeight: "600"}} className="py-2 float-end">Yours Faithfully</div>
                  </Container>
                </Container>
              }
            </div>
          </PdfContainer>
        </div>

        <Row className="py-3">
          <Col xs={6}>
            <Button
              variant="success"
              onClick={() => {
                document.getElementById("pdf-generate").click();
              }}
              className="mx-3"
            >
              Download
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Button variant="danger" onClick={() => this.props.close(false)} className="mx-3">
              Close
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
