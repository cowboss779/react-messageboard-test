import styled from "styled-components";
import { MEDIA_QUERY_MEDIUM, MEDIA_QUERY_LARGET } from "../../constants/style";
import { useState } from "react";
import TotoList from "../TodoList/TodoList";

const TodoItemWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 5px;
  }
`;

const TodoContent = styled.div`
  color: ${(props) => props.theme.colors["blue"]};
  font-size: ${({ size }) => (size === "xl" ? "25px" : "16px")};
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;

  &:hover {
    background-color: black;
    color: white;
  }

  & + & {
    margin-left: 4px;
  }

  ${MEDIA_QUERY_MEDIUM} {
    font-size: 16px;
  }

  ${MEDIA_QUERY_LARGET} {
    font-size: 12px;
  }
`;

const RedButton = styled(Button)`
  color: red;
`;

const TodoItem = ({ className, size, content }) => {
  return (
    <TodoItemWrapper className={className}>
      <TodoContent size={size}>{content}</TodoContent>
      <TodoButtonWrapper>
        <Button>已完成</Button>
        <Button>刪除</Button>
        <RedButton>d</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
};

const BlackTodoItem = styled(TodoItem)`
  background-color: black;
`;

function App() {
  const [counter, setCounter] = useState(0);
  const handleButtonClick = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      {/* <TodoItem size="xl" content={counter} />
      <TodoItem content="buy apple" />
      <BlackTodoItem content="dad" />
      <Button onClick={handleButtonClick}>增加</Button> */}
      <TotoList />
    </div>
  );
}

export default App;
