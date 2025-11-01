import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    exam: "",
    status: "",
    counselling: "",
    queryType: "",
    guidance: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setOk(true);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (ok) {
    return (
      <div className="min-h-screen grid place-items-center p-6 bg-gradient-to-b from-yellow-100 to-white">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl text-center">
          <motion.img
            src="/VS only logo.png"
            alt="VS Nursing Academy Logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your details have been submitted successfully. Our team will contact
            you soon on WhatsApp or Telegram.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-white p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6">
        {/* LOGO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-4"
        >
          <img
            src="/VS only logo.png"
            alt="VS Nursing Academy Logo"
            className="w-24 h-24 mb-2"
          />
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 text-center font-[Cinzel_Decorative]">
            Free Nursing Exam Guidance
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-[The_Seasons]">
            by VS Nursing Academy, Gandhinagar
          </p>
        </motion.div>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />
          <input
            name="phone"
            placeholder="Mobile Number"
            type="tel"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />
          <input
            name="email"
            placeholder="Email (optional)"
            type="email"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />
          <select
            name="exam"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Nursing Exam</option>
            <option>AIIMS NORCET</option>
            <option>RRB Nursing Superintendent</option>
            <option>NHM-CHO</option>
            <option>UPSC ESIC</option>
            <option>State Nursing Exam</option>
            <option>NCLEX-RN</option>
            <option>Other</option>
          </select>
          <select
            name="status"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Current Status</option>
            <option>B.Sc Nursing 1st Year</option>
            <option>B.Sc Nursing 2nd Year</option>
            <option>B.Sc Nursing 3rd Year</option>
            <option>B.Sc Nursing 4th Year</option>
            <option>Graduate</option>
            <option>Working Professional</option>
          </select>
          <select
            name="counselling"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Interested in Free Counselling?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <select
            name="queryType"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Query Type</option>
            <option>Course / Batch Info</option>
            <option>Technical Issue</option>
            <option>Study Plan or Career Help</option>
            <option>Other</option>
          </select>
          <textarea
            name="guidance"
            placeholder="What kind of help do you need?"
            onChange={handleChange}
            rows="3"
            className="w-full border p-3 rounded-xl"
          ></textarea>
          <select
            name="contact"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Preferred Contact Method</option>
            <option>WhatsApp</option>
            <option>Telegram</option>
            <option>Phone Call</option>
            <option>Email</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} VS Nursing Academy | Gandhinagar
        </p>
      </div>
    </div>
  );
}
