import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import '../css/applicationstatus.css';

const StatusPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    document.title = "Application-Status | HirePath";
    const applied = localStorage.getItem("hasApplied");
    if (applied === "true") {
      setCurrentStep(1); 
    } else {
      setCurrentStep(0); 
    }
  }, []);

  return (
    <div className="status-container">
      <Steps
        direction="vertical"
        current={currentStep}
        items={[
          {
            title: 'Finished',
            description: 'This is a description.',
          },
          {
            title: 'In Progress',
            description:
              "Application is under review, please wait for the employer's response.",
          },
          {
            title: 'Response Received',
            description:
              'You have received a response from the employer. Please check your email for further instructions.',
          },
        ]}
      />
    </div>
  );
};

export default StatusPage;
