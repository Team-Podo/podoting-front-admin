import styled from "styled-components";

export const SchedulePageStyle = styled.div`{
  
  .schedule-edit {
    padding-top: 3rem;
    margin-right: 2rem;
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
    padding: 10px;
  }
  
  .cast-list div {
    background-color: rgba(118, 74, 188, 0.7);
    font-weight: 600;
  }
  
  .actor-list li{
    cursor: pointer;
    margin: 0;
  }
  
  li.active {
    background-color: #d9c3de;
  }
}`