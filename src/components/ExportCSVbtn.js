import React from 'react';
import {Button} from 'react-bootstrap';

const ExportCSVbtn = (props) => {
    const handleClick = () => {
        props.onExport();
      };
      return (
        <div>
          <Button variant="primary" onClick={ handleClick } className="float-end">👇 Export</Button>
        </div>
      );
}

export default ExportCSVbtn;
