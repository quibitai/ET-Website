import React, { useEffect } from 'react';

interface EmergencyButtonsProps {
  prevHandler: () => void;
  nextHandler: () => void;
}

/**
 * Emergency buttons that will be inserted directly into the DOM
 * This bypasses any React-related issues with event propagation
 */
const EmergencyButtons: React.FC<EmergencyButtonsProps> = ({ prevHandler, nextHandler }) => {
  useEffect(() => {
    // Create container element
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.display = 'flex';
    container.style.gap = '20px';
    container.style.padding = '15px';
    container.style.background = 'rgba(0, 0, 0, 0.8)';
    container.style.borderRadius = '8px';
    container.style.zIndex = '9999';
    container.id = 'emergency-nav-buttons';

    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = '← PREV';
    prevButton.style.padding = '10px 15px';
    prevButton.style.background = '#ff5722';
    prevButton.style.color = 'white';
    prevButton.style.border = 'none';
    prevButton.style.borderRadius = '4px';
    prevButton.style.cursor = 'pointer';
    prevButton.style.fontWeight = 'bold';
    prevButton.onclick = () => {
      console.log('EMERGENCY PREV CLICKED');
      prevHandler();
    };

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'NEXT →';
    nextButton.style.padding = '10px 15px';
    nextButton.style.background = '#4caf50';
    nextButton.style.color = 'white';
    nextButton.style.border = 'none';
    nextButton.style.borderRadius = '4px';
    nextButton.style.cursor = 'pointer';
    nextButton.style.fontWeight = 'bold';
    nextButton.onclick = () => {
      console.log('EMERGENCY NEXT CLICKED');
      nextHandler();
    };

    // Create debug button
    const debugButton = document.createElement('button');
    debugButton.textContent = 'TEST CLICK';
    debugButton.style.padding = '10px 15px';
    debugButton.style.background = '#2196f3';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.borderRadius = '4px';
    debugButton.style.cursor = 'pointer';
    debugButton.style.fontWeight = 'bold';
    debugButton.onclick = () => {
      console.log('EMERGENCY DEBUG BUTTON CLICKED');
      alert('Debug button clicked successfully!');
    };

    // Add buttons to container
    container.appendChild(prevButton);
    container.appendChild(nextButton);
    container.appendChild(debugButton);

    // Add container to body
    document.body.appendChild(container);

    // Clean up on unmount
    return () => {
      document.body.removeChild(container);
    };
  }, [prevHandler, nextHandler]);

  // This component doesn't render anything in the React tree
  return null;
};

export default EmergencyButtons; 