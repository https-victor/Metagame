import React from "react";

import { Title, TitleSmall } from "./styles";

export default function App() {
  return (
    <div style="background-color: #fff">
      <Title fontSize={20}>
        Hello World
        <span>text menor</span>
      </Title>

      <TitleSmall>Menor</TitleSmall>
    </div>
  );
}
