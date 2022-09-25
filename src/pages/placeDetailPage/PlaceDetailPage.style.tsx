import styled from "styled-components";

export const PlaceDetailPageStyle = styled.div`{
  .place-detail-wrapper {
    display: -webkit-flex;
    -webkit-flex-direction: row;
    flex-wrap: wrap;
    
    & .place-detail {
      margin: 1rem;
      -webkit-flex: 0 0 30%;
      display: -webkit-flex;
      justify-content: space-between;
      cursor: pointer;
      
      & .place-image {
        width: 70%;
        background-color: lightgray;
      }
    }
  }
  
  
}`