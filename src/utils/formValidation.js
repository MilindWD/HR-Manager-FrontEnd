const validateAddEmployee = (body) => {
    if(!body.name) throw new Error("Please enter a name");
    if(!body.fatherName&&!body.husbandName) throw new Error("Enter Father/Husband name");
    if(!body.address) throw new Error("Enter Address");
    if(!body.mobile) throw new Error("Enter Mobile Number");
    if(body.mobile.length!==10) throw new Error("Enter valid Mobile Number");
    if(!body.age) throw new Error("Enter Age");
}

const validateAddJob = (body) => {
    if(!body.customerName) throw new Error("Please enter customer name");
    if(!body.fixedPayment) throw new Error("Please enter fixed payment");
}


module.exports = {validateAddEmployee, validateAddJob}