import React from 'react';

const BlogPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((post) => (
          <div key={post} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Blog Post {post}</h2>
            <p className="text-gray-600 mb-4">
              This is a short preview of blog post {post}. Click to read more...
            </p>
            <a
              href={`/blog/${post}`}
              className="text-blue-600 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
