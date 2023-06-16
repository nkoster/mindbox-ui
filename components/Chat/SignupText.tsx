import React from 'react'

interface SignupTextProps {
}

const SignupText: React.FC<SignupTextProps> = () => {
  return (
    <div className="w-full text-white text-justify pb-10 text-lg">
      If you are open to providing a reasonable compensation, I may consider granting access
      to my advanced GPT-3.5-16K and GPT-4-32K chatbot capabilities.<br/><br/>

      After completing the signup form below, expect to hear from me within approximately one week.<br/><br/>

      Kindly note that at this time, I am only accepting signups from Google accounts (e.g., Gmail).<br/><br/>

      Thank you for your interest and support.
    </div>
  )
}

export default SignupText
