import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const API_ENDPOINT =
  "https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc";

const Page = styled.div`
  width: 360px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
`;

const MessageForm = styled.form`
  margin-top: 16px;
`;

const MessageTextarea = styled.textarea`
  display: block;
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
`;

const MessageList = styled.div`
  margin-top: 16px;
`;

const MessageContainer = styled.div`
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;

  & + & {
    margin-top: 10px;
  }
`;

const MessageHead = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const MessageAuthor = styled.div`
  font-size: 20px;
  margin-right: auto;
`;

const MessageTime = styled.div`
  color: rgba(23, 78, 55, 0.7);
`;

const MessageBody = styled.div`
  font-size: 22px;
  margin-top: 16px;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Message({ author, time, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node,
};

function App() {
  const [message, setMessage] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState();
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleTextAreaChange = (e) => {
    setValue(e.target.value);
  };

  const handleTextAreaFocus = (e) => {
    setPostMessageError(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoadingPostMessage) return;
    setIsLoadingPostMessage(true);
    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "asd",
        body: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPostMessage(false);
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        setValue("");
        fetchMessages();
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };

  return (
    <div className="App">
      <Page>
        {isLoadingPostMessage && <Loading>Loading...</Loading>}
        <Title>留言板</Title>
        <MessageForm onSubmit={handleFormSubmit}>
          <MessageTextarea
            value={value}
            onChange={handleTextAreaChange}
            onFocus={handleTextAreaFocus}
            rows={10}
          />
          <SubmitButton>送出留言</SubmitButton>
          {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
        </MessageForm>
        {messageApiError && (
          <ErrorMessage>
            Something went wrong. {messageApiError.toString()}
          </ErrorMessage>
        )}
        {message && message.length === 0 && <div>not message.</div>}
        <MessageList>
          {message &&
            message.map((mess) => {
              return (
                <Message
                  key={mess.id}
                  author={mess.nickname}
                  time={new Date(mess.createdAt).toLocaleString()}
                >
                  {mess.body}
                </Message>
              );
            })}
        </MessageList>
      </Page>
    </div>
  );
}

export default App;
