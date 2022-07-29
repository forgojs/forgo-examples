import * as forgo from "forgo";
import { mount, rerender, Component } from "forgo";
import type { ForgoNewComponentCtor } from "forgo";

/*
  A timer component
*/
export const Timer: ForgoNewComponentCtor = () => {
  let seconds = 0;

  return new Component({
    render(_props, component) {
      setTimeout(() => {
        seconds++;
        component.update();
      }, 1000);

      return <div>{seconds} secs have elapsed...</div>;
    },
  });
};

window.addEventListener("load", () => {
  mount(<Timer />, document.getElementById("root"));
});
