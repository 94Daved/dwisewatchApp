import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 499px) {
      ${props}
    }
  `;
};
export const iPad = (props) => {
  return css`
    @media only screen and (min-width: 500px) and (max-width: 899px) {
      ${props}
    }
  `;
};
export const normalMonitor = (props) => {
  return css`
    @media only screen and (min-width: 900px) and (max-width: 1599px) {
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
