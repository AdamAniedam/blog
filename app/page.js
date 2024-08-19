"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/blogpost', {
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        setBlogPosts(Array.isArray(data) ? data : []);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    const res = await fetch('/api/blogpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      const newPost = await res.json();
      setBlogPosts([newPost, ...blogPosts]);
      e.target.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Blog Posts</h1>

        <form onSubmit={addPost} className="mb-8">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md text-black bg-white"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md text-black bg-white"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Post
          </button>
        </form>

        {blogPosts.length > 0 ? (
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <small className="text-gray-500">
                  Created at: {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
