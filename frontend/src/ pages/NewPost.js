import React, { useState } from "react";
import dynamic from "next/dynamic"; // not used but keep none
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/blogs", { title, content });
      alert("Post created");
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={submit} className="space-y-4">
        <input placeholder="Title" required value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border p-2 rounded" />
        <div>
          <ReactQuill value={content} onChange={setContent} />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Publish</button>
      </form>
    </div>
  );
}