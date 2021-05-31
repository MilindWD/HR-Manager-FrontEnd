import React from 'react';

const PdfContainer = (props) => {
    const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
    return (
        <section className="pdf-container">
      <section className="pdf-toolbar">
        <button onClick={createPdf} id="pdf-generate" style={{display: 'none'}}></button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
    );
}

export default PdfContainer;
