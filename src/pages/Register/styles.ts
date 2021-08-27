import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-top: 10px;
  }

  .button-container {
    margin-top: 5px;
    display: flex;
    justify-content: center;
  }

  .redirect {
    font-size: 12px;
    margin: 10px 0;
    text-align: center;
    span {
      color: purple;
      font-weight: 700;
    }
  }

  .error {
    font-size: 15px;
    color: red;
    margin: 10px 0;
    text-align: center;
  }
`;
