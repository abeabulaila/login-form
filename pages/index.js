import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { getSession, useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react';

export default function Home() {
  
  const { data: session } = useSession();
  const [discordUser, setDiscordUser] = useState({})
  function handleSignOut() {
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      {session ? User({ session, handleSignOut }) : Guest()}
    </div>

  )
}

//Non-Authorized User
function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'> Guest Homepage </h3>
      <div className='flex justify-center'>
        <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray'> Sign In</Link>
      </div>
    </main>
  )
}

//Authorize User
function User({ session, handleSignOut }) {

  useEffect(() => {
    fetch("https://signup-login-authentication.vercel.app/users/@me")
    .then((res) => res.json())
    .then((data) => {
      setDiscordUser(data)
    })
  }, [])

  console.log(discordUser)

  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'> Authorized User Homepage </h3>
      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      
      </div>
      <div className='flex justify-center'>
        <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo bg-gray-50'>Sign Out</button>
      </div>
      <div className='flex justify-center'>
        <Link href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray'>Profile Page</Link>
      </div>
    </main>
    
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: { session }

  }
}