import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="text-white">
      <h1>Hello World!</h1>
      {/* Create Square in The Middle */}
      <div className="">
        <div className="relative w-96 h-96">
          
        </div>
      </div>
    </main>
  )
}
