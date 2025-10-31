import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="text-sm text-gray-500 mb-2">By {post.author?.name || "Unknown"} • {new Date(post.createdAt).toLocaleString()}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content.slice(0, 300) + (post.content.length > 300 ? "..." : "") }} />
      <div className="mt-3">
        <Link to={`/post/${post._id}`} className="text-blue-600">Read more →</Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/blogs");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Blogs</h1>
      {posts.length === 0 ? <p>No posts yet.</p> : posts.map((p) => <PostCard key={p._id} post={p} />)}
    </div>
  );
}