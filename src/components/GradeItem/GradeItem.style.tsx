import styled from "styled-components";

export const GradeItemStyle = styled.div<{color: string}>`{
  div {
    background-color: ${props => props.color};
    width: 20px;
    height: 20px;
  }
}`
