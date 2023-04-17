import styled, { css } from "styled-components";
export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 70vh;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  padding: 2rem 2rem 2rem 2rem;
`;

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  &:hover {
    background: black;
    cursor: pointer;
    border: 1px solid red;
  }
  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;