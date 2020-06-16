/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { MovieContext } from "../../../Context/MovieContext";

const HeroNavLink = ({ btnText }) => {
  const { activeLink, setActiveLink, setHiddenMenu } = useContext(MovieContext);

  return (
    <button
      style={{ color: activeLink === btnText ? "#f9a5ff" : "#fff" }}
      css={styles}
      onClick={() => {
        setActiveLink(btnText);
        setHiddenMenu(true);
      }}
    >
      {btnText}
    </button>
  );
};

const styles = css`
  border: none;
  outline: none;
  background: transparent;
  font-size: 22px;
  margin-right: 24px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  @media (max-width: 860px) {
    font-size: 40px;
  }
`;

export default HeroNavLink;
