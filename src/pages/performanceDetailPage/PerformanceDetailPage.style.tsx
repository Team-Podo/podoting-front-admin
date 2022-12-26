import styled from "styled-components";

export const DetailWrapper = styled.div`

  .info-left {
    display: -webkit-flex;
    -webkit-flex-direction: row;
  }

  .poster-container {
    margin-top: 5rem;
    width: 230px;
  }

  .poster-container img {
    width: 100%;
  }

  .info-left-detail-box {
    padding: 2rem;
    display: inline-block;
    vertical-align: top;
  }

  #title {
    width: 500px;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .wrapper {
    position: relative;
    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-flex-direction: row;
  }

  .content {
    min-height: 3000px;
    width: 55rem;
  }

  .content-inner {
    padding-top: 4rem;
    width: 100%;
  }

  .content-inner > h3 {
    margin-bottom: 1rem;
  }

  .content-inner > img {
    width: 100%;
  }

  .detail-tab {
    background-color: #f7e8fc;
    width: 10rem;

    li {
      padding: 1rem;
    }

    li.active {
      background-color: #764abc;
      color: #fff;
      font-weight: bold;
    }
  }

  .add-cast-form > div {
    margin-bottom: 1rem;
    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-align-items: center;
    -webkit-justify-content: center;
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

  input[name="cast-profile"] {
    width: 180px;
  }
  
  .cast-profile {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50px;

    & > img {
      width: 100%;
    }
  }

  select[name="character"], select[name="actor"], input[name="cast-profile"] {
    margin: 0 1rem;
  }

`
