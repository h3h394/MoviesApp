/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import HeroNav from "./HeroNav/HeroNav";
import Output from "../Output/Output";

const Hero = () => {
  return (
    <section css={styles} className="hero">
      <HeroNav />
      <Output />
    </section>
  );
};

const styles = css`
  width: 100%;
  min-height: 100vh;
  background: #1b1c22;
`;

export default Hero;
