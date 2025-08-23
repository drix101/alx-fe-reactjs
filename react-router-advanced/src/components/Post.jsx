// src/components/Post.jsx
import React from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  return <h1>Viewing Blog Post #{id}</h1>;
}

export default Post;