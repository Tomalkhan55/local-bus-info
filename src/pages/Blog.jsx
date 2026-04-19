import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs')
        const data = await res.json()
        setBlogs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* Hero */}
      <section className="bg-[#f0f7f4] py-16 px-4 border-b border-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
            ব্লগ
          </span>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            বাস রুট গাইড ও টিপস
          </h1>
          <p className="text-gray-400 text-lg">
            ঢাকার বাসে চলাচল সম্পর্কে দরকারি তথ্য ও টিপস
          </p>
        </div>
      </section>

      {/* Blogs */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-green-50 hover:border-green-200 transition-all overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    {blog.category}
                  </span>
                  <h3 className="font-bold text-slate-800 mt-3 mb-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {blog.content}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                    <span>✍️ {blog.author}</span>
                    <span>{new Date(blog.date).toLocaleDateString('bn-BD')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Blog