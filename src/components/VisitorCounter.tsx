import React, { useState, useEffect } from 'react';
import { useRetro } from '../contexts/RetroContext';

const VisitorCounter: React.FC = () => {
  const { isRetro } = useRetro();
  const [visitorCount, setVisitorCount] = useState(() => {
    const saved = localStorage.getItem('visitor-count');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    // Increment visitor count
    const newCount = visitorCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem('visitor-count', newCount.toString());
  }, []);

  if (!isRetro) {
    return null;
  }

  return (
    <div className="visitor-counter">
      <img 
        src="data:image/gif;base64,R0lGODlhEAAQALMAAAAAAP///+7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQAAACH+AS4ALAAAAAAQABAAAARFEMj3gL0P4pzUMIqrcB0XBuIYjgNWnIWVJMqVkgGYQEHQhLwwfBaYBYP5gUAQ1GWBXhZIyfgVQTEpKFSi2CwWg+VqtQgAOw==" 
        alt="Under Construction"
        className="construction"
      />
      <div>
        Visitors: {visitorCount.toString().padStart(6, '0')}
      </div>
    </div>
  );
};

export default VisitorCounter; 