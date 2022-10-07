import styled from "styled-components";

export const SchedulePageStyle = styled.div`{
  
  .schedule-edit {
    padding-top: 3rem;
    margin-right: 2rem;
  }
  
  .cast-list ul{
    display: inline-block;
    text-align: center;
    margin: 0;
  }
  
  .cast-list div, .cast-list li {
    display: inline-block;
    padding: 10px;
  }
  
  .cast-list div {
    background-color: #764abc;
  }
  
  .actor-list li{
    cursor: pointer;
    margin: 0;
  }
  
  li.active {
    background-color: #d9c3de;
  }
}`