import styled from "styled-components";

export const AlertModalStyle = styled.div`{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  -webkit-flex-direction: row;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1001;

  .modal {
    position: relative;
    opacity: 1;
    z-index: 1002;
    min-width: 300px;
    background-color: #fff;
    padding: 2rem;
  }

  .modal-close {
    cursor: pointer;
    font-weight: bold;
    font-size: 1.3rem;
    color: #764abc;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .alert {
    text-align: center;
    border-radius: 10px;
  }

  .alert p {
    margin-bottom: 10px;
  }

  .alert-confirm {
    color: #764abc;
    background-color: #fff;
    border: none;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .alert-confirm:hover {
    cursor: pointer;
  }

  .alert-cancel {
    color: darkgray;
    background-color: #fff;
    border: none;
    font-weight: bold;
    font-size: 1.1rem;
    margin-left: 15px;
  }

  .alert-cancel:hover {
    cursor: pointer;
  }
}`