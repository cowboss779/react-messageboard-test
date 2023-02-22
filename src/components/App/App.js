import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter, Routes, Route, useParams } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import Header from "../Header";
import { getMe, getPosts } from "../../WebAPI";
import { AuthContext } from "../../contexts";

const Root = styled.div`
  padding-top: 64px;
`;

const PostPageContainer = styled.div``;
const PostPageTitle = styled.div``;
const PostPageBody = styled.div``;
const PostPageCreatedAt = styled.div``;

function PostPage({ posts }) {
  const { id } = useParams();
  const d = posts.filter((post) => post.id === Number(id));
  return (
    <PostPageContainer>
      <PostPageTitle>{d[0].title}</PostPageTitle>
      <PostPageCreatedAt>{d[0].createdAt}</PostPageCreatedAt>
      <PostPageBody>{d[0].body}</PostPageBody>
    </PostPageContainer>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  useEffect(() => {
    getMe().then((res) => {
      if (res.ok) {
        setUser(res.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage posts={posts} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts/:id" element={<PostPage posts={posts} />} />
          </Routes>
        </HashRouter>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
