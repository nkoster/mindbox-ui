import {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'
import path from 'path'

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const signupRequestListPath = path.join(process.cwd(), 'signuprequestlist.json')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {

    console.log('>>>>', req.body)

    // const formData: FormData = JSON.parse(req.body)

    const formData: FormData = req.body

    try {
      const rawData = fs.readFileSync(signupRequestListPath, 'utf8')
      const signupRequestList = JSON.parse(rawData)

      if (signupRequestList.some((user: FormData) => user.email === formData.email)) {
        res.status(409).json({message: 'Email bestaat al'})
      } else {
        signupRequestList.push(formData)
        fs.writeFileSync(signupRequestListPath, JSON.stringify(signupRequestList))
        res.status(200).json({message: 'Succes'})
      }
    } catch (error) {
      res.status(500).json({message: 'Er is een fout opgetreden'})
    }
  } else {
    res.status(405).json({message: 'Methode niet toegestaan'})
  }
}
