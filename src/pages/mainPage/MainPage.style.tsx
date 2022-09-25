import styled from "styled-components";

export const MainPageStyle = styled.div`{
  background-color: #e5e5e5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-box {
    background-color: #fff;
    width: 300px;
    height: 200px;
    border-radius: 7px;
    padding: 20px;
  }
  
  .input-wrapper {
    margin-bottom: 1rem;
    
    & label {
      display: block;
    }
    
    & input {
      width: 100%;
      height: 2rem;
      padding-left: 10px;
      border-radius: 5px;
      border: 1px solid lightgray;
    }
    
  }
  
  .button {
    float: right;
    cursor: pointer;
    padding: 0.6rem 2rem;
    border: 2px solid rgb(255, 255, 255);
    background-color: rgb(118, 74, 188);
    border-radius: 10px;
    color: rgb(255, 255, 255);
    font-weight: bold;
  }
  
  
}`