import React, { useState } from 'react';

const OwnerRegisterStep = {
    FIRST: 0,
    SECONDS: 1,
    THIRD: 2,
};

const OwnerRegister = () => {
    const [currentStep, setcurrentStep] = useState(0);
    return <div>OwnerRegister</div>;
};

export default OwnerRegister;
