import Styled from "react-systyle";

export const Box = Styled.with({
  display: "flex",
  boxSizing: "border-box"
});

export const Txt = Styled.as("span").with({
  display: "inline-flex",
  boxSizing: "border-box"
});
