import styled from "styled-components";

export const NavStyle = styled.nav`{
  width: 1280px;
  height: 80px;
  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  -webkit-flex-direction: row;
  margin: 0 auto;
  
  .nav-left {
    flex: 1;
    display: -webkit-flex;
    align-items: center;
  }
  
  .logo {
    width: 150px;
  }

  li {
    font-weight: 500;
    display: -webkit-inline-flex;
    padding: 0.7rem 1rem;
    border-radius: 7px;
    margin: 0 1rem;
    cursor: pointer;
  }

  li.active {
    background-color: #000;
    color: #fff;
  }

  .profile-image {
    width: 40px;
    height: 40px;
    background-color: #764abc;
    border-radius: 100%;
  }
}`