import styled from "styled-components";

export const BoardItemStyle = styled.div<{seatMargin:number}>`{
  
  .board {
    position: absolute;
    top: 200px;
    left: 200px;
    min-width: 300px;
    min-height: 200px;
    border: 1px solid #000;
    cursor: grab;
  }
  
  .seat {
    margin-right: ${props => props.seatMargin}px;
  }
}`