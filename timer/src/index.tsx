import { mount, rerender, ForgoRenderArgs } from "forgo";

/*
  A timer component
*/
export function Timer() {
  let seconds = 0;

  return {
    render(props: any, args: ForgoRenderArgs) {
      setTimeout(() => {
        seconds++;
        rerender(args.element);
      }, 1000);

      return <div>{seconds} secs have elapsed...</div>;
    },
  };
}


window.addEventListener("load", () => {
  mount(<Timer />, document.getElementById("root"));
});
