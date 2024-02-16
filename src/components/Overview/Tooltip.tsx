import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipStyles: React.CSSProperties = {
    position: 'absolute',
    top: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#333',
    color: '#fff',
    padding: '0.5em',
    borderRadius: '4px',
    fontSize: '0.8em',
    opacity: 0.9,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
    display: showTooltip ? 'block' : 'none',
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      <div style={tooltipStyles}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
