import styled from "styled-components";

export const SchedulePageStyle = styled.div`{
  .schedule-edit-box {
    width: 900px;
  }
  
  .schedule-edit {
    width: 400px;
    padding: 2rem 2rem 0 2rem;
  }
  
  .cast-list {
    font-size: 0.9rem;
  }
  
  .cast-list ul{
    position: relative;
    display: inline-block;
    text-align: center;
    margin: 0;
  }
  
  .cast-list div, .cast-list li {
    display: inline-block;
    padding: 7px 10px;
  }
  
  .cast-list div {
    color: #ffffff;
    background-color: rgba(118, 74, 188, 0.6);
    font-weight: bold;
    position: relative;
    margin-bottom: 3px;
    border-radius: 5px;
  }

  
  .actor-list li{
    cursor: pointer;
    margin: 0;
  }
  
  li.active {
    position: relative;
    //background-color: #d9c3de;
  }

  li.active:before {
    position: absolute;
    top: 10%;
    left: -5%;
    margin: 10px;
    width: 80%;
    height: 30%;
    content: "";
    background-color: #d9c3de;
    opacity: 0.5;
    z-index: -1;
    transform: skew(160deg);
  }
  
}`