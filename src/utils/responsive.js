import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 449px) {
      ${props}
    }
  `;
};
export const iPad = (props) => {
  return css`
    @media only screen and (min-width: 550px) and (max-width: 889px) {
      ${props}
    }
  `;
};
export const semiMonitor = (props) => {
  return css`
    @media only screen and (min-width: 890px) and (max-width: 1199px) {
      ${props}
    }
  `;
};
export const normalMonitor = (props) => {
  return css`
    @media only screen and (min-width: 1200px) and (max-width: 1599px) {
      ${props}
    }
  `;
};
export const bigMonitor = (props) => {
  return css`
    @media only screen and (min-width: 1600px) {
      ${props}
    }
  `;
};
