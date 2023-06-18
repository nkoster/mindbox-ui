import React, {useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
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

  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value)
    setSubmitButtonDisabled(!value)
  }

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
      toast.success('Signup successfully! You will be redirected to the homepage')
      setFormData({name: '', email: '', phone: ''})
    } else {
      toast.error('Something went wrong')
    }

    setTimeout(() => {
      window.location.href = '/'
    }, 2000)

  }

  // 6Ldco6YmAAAAAN7QM6q3XpaTJiFsT-vzz4mtZYXv

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
        <div className="flex flex-row justify-between">
          <div className="opacity-70">
            <ReCAPTCHA sitekey="6LdXt6YmAAAAAIbUUQdkvMnZ9fw82kZfmUurVTA3" onChange={handleCaptchaChange}/>
          </div>
          <button
            type="submit"
            disabled={formData.name.length < 3 || formData.email.length < 3 || formData.phone.length < 7 || !captchaValue || submitButtonDisabled}
            className="bg-green-400 text-black mt-3 px-6 py-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
