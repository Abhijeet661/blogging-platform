import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await API.get(`/blogs`);
      const p = res.data.find(item => item._id === id);
      setPost(p);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      alert("Deleted");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => { fetchPost(); }, [id]);

  if (!post) return <p>Loading...</p>;

  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthor = user && user.id === post.author?._id;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      {isAuthor && (
        <div className="mt-4">
          <button onClick={() => navigate(`/new`)} className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
          <button onClick={deletePost} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      )}
    </div>
  );
}