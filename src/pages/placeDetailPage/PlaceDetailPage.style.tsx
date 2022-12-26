import styled from "styled-components";

export const PlaceDetailPageStyle = styled.div`{
  .place-detail-wrapper {
    display: -webkit-flex;
    -webkit-flex-direction: row;
    flex-wrap: wrap;
    
    & .place-detail {
      margin: 1rem;
      display: -webkit-flex;
      -webkit-flex: 0 0 30%;
      -webkit-justify-content: space-between;
      cursor: pointer;
      
      & .place-image {
        width: 70%;
        background-color: lightgray;
      }
    }
  }


  .add-cast-btn {
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 100%;
    text-align: center;
    font-size: 50px;
    color: #e5e5e5;
    background-color: #fff;
    box-shadow: inset 0 0 2px 2px #e5e5e5;
    cursor: pointer;
  }

  .add-cast-btn:after {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 80px;
    width: 80px;
    content: "+";
  }

  .add-cast-btn:hover {
    transition: 0.3s;
    background-color: #e5e5e5;
    color: #fff;
    box-shadow: none;
  }
  
}`