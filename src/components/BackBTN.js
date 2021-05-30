import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const BackBTN = () => {
    return (
        <Button onClick={useHistory().goBack} variant='outline-primary'>Go Back</Button>
    );
}

export default BackBTN;
