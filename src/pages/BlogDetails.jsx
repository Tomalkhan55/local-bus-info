import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  )

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">ব্লগ পাওয়া যায়নি</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* Cover Image */}
      <div className="w-full h-64 sm:h-80 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <section className="py-10 px-4">
        <div className="max-w-2xl mx-auto">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium"
          >
            ← ফিরে যান
          </button>

          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            {blog.category}
          </span>

          <h1 className="text-3xl font-bold text-slate-800 mt-4 mb-3">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-green-100">
            <span>✍️ {blog.author}</span>
            <span>📅 {new Date(blog.date).toLocaleDateString('bn-BD')}</span>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {blog.content}
          </p>

        </div>
      </section>

    </div>
  )
}

export default BlogDetails