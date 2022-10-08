import styled from "styled-components";

export const SeatPageStyle = styled.div`{
  display: -webkit-flex;
  -webkit-flex-direction: row;
  height: 600px;
  justify-content: space-between;
  
  & .seat-map-image {
    overflow: scroll;
    width: 800px;
    background-color: grey;
    position: relative;
  
    &>img {
      -webkit-user-drag: none;
    }
    
    & .seat-map-canvas {
      position: absolute;
      display: -webkit-flex;
      -webkit-flex-direction: column;
      -webkit-align-items: center;
      background-color: cyan;
      min-width: 300px;
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      top: 0;
      left: 0;
      
      & div {
        display: -webkit-flex;
        flex-direction: row;
        justify-content: space-between;
      }
      
      & .block {
        cursor: pointer;
        width: 15px;
        height: 15px;
        border-radius: 3px;
      }

    }
  }
  
  & .edit-seat-info {
    display: -webkit-flex;
    flex-direction: column;
    background-color: lightcyan;
    width: 20%;
    height: 600px;
    overflow: scroll;
    padding: 0 1rem;


    & .row-info {
      display: -webkit-flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #000;
      
      &>div {
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
      }
      
      & .row-add-grades {
        display: -webkit-flex;
        flex-direction: row;
        
        & > *{
          margin-left: 10px;
        }
      }
    }
  }
  
  .submit-seat {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
}`