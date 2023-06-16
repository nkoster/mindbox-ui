import React, {useState} from 'react'
import toast from 'react-hot-toast'

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      toast.success('Succes')
      setFormData({name: '', email: '', phone: ''})
    } else {
      toast.error('Email bestaat al')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-green-700 p-6 rounded-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="bg-green-500 text-black placeholder-white w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="bg-green-500 text-black placeholder-white w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="bg-green-500 text-black placeholder-white w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        />
        <button
          type="submit"
          disabled={formData.name.length < 3 || formData.email.length < 3 || formData.phone.length < 7}
          className="bg-green-400 text-black px-6 py-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default SignupForm
