// src/components/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  { id: 1, title: "React Router Basics" },
  { id: 2, title: "Advanced Routing Techniques" },
  { id: 3, title: "Protected Routes in React" },
];

function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
