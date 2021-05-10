import styled from "styled-components";

export const Container = styled.button`
  background: ${(props) => (props.whiteSchema ? "#f5f5f5" : "#0c0d0d")};
  color: ${(props) => (props.whiteSchema ? "#0c0d0d" : "#f5f5f5")};
  height: 45px;
  border-radius: 0.5rem;
  border: 0;
  padding: 0 0.5rem;
  width: 100%;
  font-weight: 600;
  transition: 0.5s;
  border: 2px solid var(--black);
  font-family: "Roboto Mono";

  margin-top: 1rem;

  :hover {
    border: 2px solid #c85311;
  }
`;
