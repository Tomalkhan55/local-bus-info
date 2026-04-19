function About() {
  const team = [
    {
      name: 'Tomal',
      id: '2231081100',
      role: 'Full Stack Developer',
      desc: 'Backend API, Database Design এবং Frontend Development এর কাজ করেছেন।',
      emoji: '👨‍💻'
    },
    {
      name: 'Rifat',
      id: '223208453',
      role: 'Frontend Developer',
      desc: 'UI/UX Design এবং Frontend Development এর কাজ করেছেন।',
      emoji: '👨‍💻'
    }
  ]

  const features = [
    { icon: '🔍', title: 'রুট সার্চ', desc: 'যেকোনো দুটি স্টপেজের মধ্যে বাস খুঁজুন' },
    { icon: '🚌', title: 'বাস সার্চ', desc: 'বাসের নাম দিয়ে সরাসরি খুঁজুন' },
    { icon: '📍', title: 'বিস্তারিত রুট', desc: 'প্রতিটি বাসের সম্পূর্ণ রুট দেখুন' },
    { icon: '⏰', title: 'সময়সূচী', desc: 'প্রথম ও শেষ বাসের সময় জানুন' },
  ]

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* Hero */}
      <section className="bg-[#f0f7f4] py-16 px-4 border-b border-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
            আমাদের সম্পর্কে
          </span>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            ঢাকা বাস রুট ফাইন্ডার
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            ঢাকার যানজট আর বাস সংক্রান্ত বিভ্রান্তি কমাতে আমরা তৈরি করেছি এই অ্যাপ্লিকেশন। ১৮২টিরও বেশি বাস রুটের তথ্য এক জায়গায় পাবেন।
          </p>
        </div>
      </section>

      {/* Project Summary */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">প্রজেক্ট সম্পর্কে</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-50">
            <p className="text-gray-500 leading-relaxed mb-4">
              ঢাকা বাস রুট ফাইন্ডার একটি ওয়েব অ্যাপ্লিকেশন যা ঢাকার যাত্রীদের সঠিক বাস খুঁজে পেতে সাহায্য করে। এই অ্যাপে ১৮২টি বাসের রুট, সময়সূচী এবং স্টপেজ তথ্য রয়েছে।
            </p>
            <p className="text-gray-500 leading-relaxed">
              প্রজেক্টটি তৈরি হয়েছে <span className="text-green-600 font-medium">React, Node.js, Express এবং MongoDB</span> ব্যবহার করে। ডেটা সংগ্রহ করা হয়েছে ঢাকার বিভিন্ন বাস রুট থেকে।
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f0f7f4] py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-10 text-center">মূল ফিচার</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-green-50 flex gap-4 items-start">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-700 mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">টেকনোলজি</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'DaisyUI'].map((tech, i) => (
              <span key={i} className="bg-green-50 text-green-700 border border-green-100 px-4 py-2 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f0f7f4] py-14 px-4 border-t border-green-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-10 text-center">আমাদের টিম</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-green-50 text-center">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name} ({member.id})</h3>
                <p className="text-green-600 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default About