/// <reference types="react" />
/// <reference types="react-dom" />

declare module "*.jsx" {
  import { FunctionComponent } from "react";
  const component: FunctionComponent<any>;
  export default component;
}
