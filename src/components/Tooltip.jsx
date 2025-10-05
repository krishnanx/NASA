import React from 'react';
import styled from 'styled-components';

const Tooltip = () => {
  return (
    <StyledWrapper>
      <div className="item-hints">
        <div className="hint" data-position={4}>
          <div className="hint-content do--split-children">
            <p>Click to explore DEEP ZOOM</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: absolute;  /* relative to planet-image */
  top: -10%;           /* adjust vertical position */
  left: 50%;           /* adjust horizontal */
  transform: translateX(-50%);

  .hint-content.do--split-children {
    font-size: 20px;  /* increase font size */
  }

  .item-hints .hint-dot {
    z-index: 3;
    border: 1px solid #ffe4e4;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: rgba(255,255,255,0.1);
    font-size: 0.9rem;
  }

  .item-hints .hint-content {
    width: 300px;
    position: absolute;
    bottom: 100%;       /* show above the dot */
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    padding: 10px 15px;
    opacity: 1;         /* always visible */
    visibility: visible; /* always visible */
    background: rgba(0,0,0,0.85);
    color: white;
    border-radius: 8px;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
  }

  /* optional line pointing to dot */
  .item-hints .hint-content::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: rgba(0,0,0,0.85);
  }
`;

export default Tooltip;
