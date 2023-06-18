import SignupForm from '../../components/SignupForm'
import {Toaster} from 'react-hot-toast'
import SignupText from '@/components/Chat/SignupText'

export default function Signup() {
  return (
    <div className={'w-full pt-10'}>
      <div className={'w-4/12 mx-auto'}>
        <SignupText/>
        <SignupForm/>
        <Toaster/>
      </div>
    </div>
  )
}
