import React, { Component } from "react";

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Doc from "./DocService";
import PdfContainer from "./PdfContainer";

import { Button, Col, Container, Row } from "react-bootstrap";

const { ToWords } = require("to-words");
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  },
});
export default class Export extends Component {
  constructor(props) {
    super(props);
  }
  createPdf = (html, id) => Doc.createPdf(html, id);

  printDocument(id = null) {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        format: "a5",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(id ? `${id}.pdf` : "download.pdf");
    });
  }

  render() {
    return (
      <div>
        <div style={{ border: "1px solid LightGray" }}>
        <PdfContainer createPdf={(e) => {
          this.createPdf(e, this.props.id)
        }} > 
        <div
            id="divToPrint"
            className="mt4"
            style={{ width: "145mm", height: "210mm" }}
          >
            {
              
                <Container
                  style={{ width: "140mm", height: "210mm" }}
                  className="py-2"
                >
                  <Container>
                    <h5 style={{ textAlign: "center", paddingTop: "10mm" }}>
                      Cash Voucher
                    </h5>
                    <hr></hr>
                    <h6 className="text-center bold">
                      Health and Wellness Health Care Services (R)
                    </h6>
                    <p style={{ fontSize: "3mm", textAlign: "center" }}>
                    {this.props.address}
                    </p>
                    <Container className="mx-1">
                      <Row>
                        <Col xs={6} style={{ fontSize: "3.5mm" }}>
                          <strong>No: </strong>
                          {this.props.id}
                        </Col>
                        <Col
                          xs={6}
                          className="text-end"
                          style={{ fontSize: "3.5mm" }}
                        >
                          <strong>Date: </strong>
                          {this.props.date || ""}
                        </Col>
                      </Row>
                      <hr></hr>
                      <Container className="px-4">
                        <p>
                          <strong
                            style={{ fontSize: "4mm", marginBottom: "0" }}
                          >
                            Recieved Cash:
                          </strong>
                        </p>
                        <p
                          style={{
                            fontSize: "3.5mm",
                            height: "7mm",
                            borderBottom: "1px solid LightGray",
                            marginTop: "0",
                          }}
                        >
                          {toWords.convert(parseInt(this.props.amount || 0))}
                        </p>
                      </Container>
                      <Container className="px-4">
                        <p>
                          <strong
                            style={{ fontSize: "4mm", marginBottom: "0" }}
                          >
                            Towards:{" "}
                          </strong>
                        </p>
                        <p
                          style={{
                            fontSize: "3.5mm",
                            height: "7mm",
                            borderBottom: "1px solid LightGray",
                            marginTop: "0",
                          }}
                        >
                          {this.props.employee || ""}
                        </p>
                      </Container>
                      <Container className="p-4 text-end">
                        <p
                          style={{
                            fontSize: "4mm",
                            fontWeight: "bold",
                            display: "inline-block",
                            width: "100%",
                            border: "1px solid LightGray",
                            borderRadius: "1mm",
                            backgroundColor: "WhiteSmoke",
                          }}
                          className="p-2 text-center"
                        >
                          Rs. {this.props.amount || 0}
                        </p>
                      </Container>
                      <Container className="px-4">
                        <p>
                          <strong
                            style={{ fontSize: "4mm", marginBottom: "0" }}
                          >
                            Comments:{" "}
                          </strong>
                        </p>
                        <p
                          style={{
                            fontSize: "3.5mm",
                            height: "7mm",
                            borderBottom: "1px solid LightGray",
                            marginTop: "0",
                          }}
                        >
                          {this.props.comment || ""}
                        </p>
                      </Container>
                      <Container
                        className="px-4"
                        style={{
                          fontSize: "3.7mm",
                          fontWeight: "500",
                          paddingTop: "25mm",
                        }}
                      >
                        <Row>
                          <Col xs={6}>Accountant</Col>
                          <Col xs={6} className="text-end">
                            Employee 
                          </Col>
                        </Row>
                      </Container>
                    </Container>
                  </Container>
                  <hr />
                  <Row style={{ fontSize: "3.5mm" }}>
                    <Col xs={6}>
                      <strong>Contact:</strong> {this.props.contact}
                    </Col>
                    <Col xs={6} className="text-end">
                      <strong>Visit:</strong> <a target="_blank" rel="noreferrer" href="http://healthwellnesscare.org">www.healthwellness.org</a>{" "}
                    </Col>
                  </Row>
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
                document.getElementById('pdf-generate').click();
              }}
            >
              Download
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Button variant="danger" onClick={this.props.closeHandler}>
              Close
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
