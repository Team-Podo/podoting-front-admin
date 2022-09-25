import styled from "styled-components";

export const RowItemStyle = styled.div<{rowMargin: number, rowMarginLeft: number}>`{
  margin-bottom: ${props => props.rowMargin}px;
  margin-left: ${props => props.rowMarginLeft}px;
}`