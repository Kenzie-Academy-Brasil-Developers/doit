import styled, { css } from "styled-components";

export const Container = styled.div`
  text-align: left;
  div {
    margin-bottom: 0.5rem;
    span {
      color: #c53030;
      font-size: 14px;
    }
  }
`;

export const InputContainer = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  border: 2px solid #666360;
  color: #666360;
  padding: 1rem;
  width: 100%;
  display: flex;
  transition: 0.4s;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
      svg {
        color: #c53030;
      }
    `}

  input {
    background: transparent;
    align-items: center;
    flex: 1;
    border: 0;
    color: #312e38;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 1rem;
  }
`;
