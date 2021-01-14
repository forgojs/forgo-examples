import { mount, rerender, ForgoRenderArgs } from "forgo";

/*
  The main Todo List component
*/
type TodoListProps = {};

export function TodoList(props: TodoListProps) {
  let todos: string[] = [];

  return {
    render(props: TodoListProps, args: ForgoRenderArgs) {
      function onTodoAdd(text: string) {
        todos.push(text);
        rerender(args.element);
      }

      return (
        <div>
          <h1>Forgo Todos</h1>
          <ul>
            {todos.map((t) => (
              <TodoListItem text={t} />
            ))}
          </ul>
          <AddTodo onAdd={onTodoAdd} />
        </div>
      );
    },
  };
}

/*
  Display a Todo list item
*/
type TodoListItemProps = {
  text: string;
};

export function TodoListItem(props: TodoListItemProps) {
  return {
    render() {
      return <li>{props.text}</li>;
    },
  };
}

/*
  Add a Todo Box
*/
type AddTodoProps = {
  onAdd: (text: string) => void;
};

function AddTodo(props: AddTodoProps) {
  const input: { value?: HTMLInputElement } = {};

  function onClick() {
    const inputEl = input.value;
    if (inputEl) {
      props.onAdd(inputEl.value);
      inputEl.value = "";
      inputEl.focus();
    }
  }

  return {
    render() {
      return (
        <div>
          <input type="text" ref={input} />
          <button onclick={onClick}>Add me!</button>
        </div>
      );
    },
  };
}

window.addEventListener("load", () => {
  mount(<TodoList />, document.getElementById("root"));
});
