import styled from "styled-components";

export const SeatItemStyle = styled.div<{color: string, point: {x:number, y:number}}>`{
  background-color: ${props => props.color};
  top: ${props => props.point.y}px;
  left: ${props => props.point.x}px;
  position: absolute;
  width: 11px;
  height: 11px;
  font-size: 3px;
  
  &.active {
    box-shadow: 0 0 1.5px 1px #000;
  }
  
  &.unset {
    border: 1px dashed #000;
    background-image: linear-gradient(-60deg, transparent, transparent 15%, #000 15%, #000 30%, transparent 30%, transparent 45%, #000 45%, #000 60%, transparent 60%, transparent 75%, #000 75%, #000 90%, transparent 90%, #000);
  }
}`