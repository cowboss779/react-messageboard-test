import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  memo,
  useCallback,
} from "react";
import styled from "styled-components";
import useInput from "../../useInput";

const TodoContent = styled.div`
  margin-right: auto;
  text-decoration: ${({ isDone }) => (isDone ? "line-through" : "none")};
`;

function Button({ onClick, content }) {
  console.log("render");
  return <button onClick={onClick}>{content}</button>;
}

const MemoButton = memo(Button);

function TotoList() {
  let id = useRef(1);
  // run lazy initializer
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos");
    todoData = JSON.parse(todoData);

    if (todoData.length !== 0) {
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });

  const [input, setInput] = useState("");

  const { value, setValue, handleChange } = useInput();

  // useLayoutEffect(() => {
  //   const todoData = window.localStorage.getItem("todos") || "";
  //   if (todoData) setTodos(JSON.parse(todoData));
  // }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
    console.log("1. ", JSON.stringify(todos));

    // clear up
    return () => {
      console.log("2. ", JSON.stringify(todos));
    };
  }, [todos]);

  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  const handleButtonClick = useCallback(() => {
    console.log(input);

    if (!input) return;
    setTodos([{ id: id.current, content: input, isDone: false }, ...todos]);
    setInput("");
    id.current++;
  }, [input, todos]);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleIsDone = (id) => {
    console.log("gg", id);
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        console.log("r", { ...todo, isDone: !todo.isDone });
        return { ...todo, isDone: !todo.isDone };
      })
    );
  };

  const flex = {
    display: "flex",
    justifyContent: "center",
    border: "1px solid black",
    width: "400px",
    margin: "0 auto",
    padding: "6px 12px",
  };

  const TodoItem = ({ content, id, isDone }) => {
    return (
      <>
        <div style={flex} data-todo-id={id}>
          <TodoContent isDone={isDone}>{content}</TodoContent>
          <a href={window.encodeURIComponent(content)}>click me</a>
          <button onClick={() => handleIsDone(id)}>
            {isDone ? "未完成" : "已完成"}
          </button>
          <button
            onClick={() => {
              handleDelete(id);
            }}
          >
            刪除
          </button>
        </div>
      </>
    );
  };

  return (
    <div>
      <div style={flex}>
        <input
          type="text"
          placeholder="add todo"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        {/* <button onClick={handleButtonClick}>add todo</button> */}
        <MemoButton onClick={handleButtonClick} content={"add todo"} />
      </div>

      {todos.map((todo) => (
        <TodoItem
          id={todo.id}
          content={todo.content}
          isDone={todo.isDone}
          key={todo.id}
        />
      ))}
    </div>
  );
}

export default TotoList;
