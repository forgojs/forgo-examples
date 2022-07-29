import * as forgo from "forgo";
import { mount, rerender, Component } from "forgo";
import type { ForgoNewComponentCtor } from "forgo";

/*
  The main Todo List component
*/
export const TodoList: ForgoNewComponentCtor = () => {
  let todos: string[] = [];

  return new Component({
    render(_props, component) {
      function onTodoAdd(text: string) {
        todos.push(text);
        component.update();
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
  });
};

/*
  Display a Todo list item
*/
interface TodoListItemProps {
  text: string;
}

export const TodoListItem: ForgoNewComponentCtor<TodoListItemProps> = (
  _props
) => {
  return new Component({
    render(props) {
      return <li>{props.text}</li>;
    },
  });
};

/*
  Add a Todo Box
*/
interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: ForgoNewComponentCtor<AddTodoProps> = (props) => {
  const input: { value?: HTMLInputElement } = {};

  const saveTodo = () => {
    const inputEl = input.value;
    if (inputEl) {
      props.onAdd(inputEl.value);
      inputEl.value = "";
      inputEl.focus();
    }
  };

  // Add the todo when enter is pressed
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTodo();
    }
  };

  return new Component({
    render() {
      return (
        <div>
          <input onkeypress={onKeyPress} type="text" ref={input} />
          <button onclick={saveTodo}>Add me!</button>
        </div>
      );
    },
  });
};

function ready(fn: any) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(() => {
  mount(<TodoList />, document.getElementById("root"));
});
