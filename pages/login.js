import Head from 'next/head'
import Layout from '@/layout/layout'
import Link from 'next/link'
import styles from'../styles/Form.module.css'
import Image from 'next/image'

export default function Login() {
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className='w-3/4 mx-auto flex flex-col gap-10'>
                <div className='title'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                    <p className='w-3/4 mx-auto text-gray-400'>Welcome to the application words go here</p>
                </div>
                <form className='flex flex-col gap-5'>
                    <div className={styles.input_group}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            className={styles.input_text}
                        />
                    </div>
                    <div className={styles.input_group}>
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            className={styles.input_text}
                        />
                    </div>
                    <div className='input-button'>
                        <button type='submit' className={styles.button}>
                            Login
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom}>
                            Sign In With Google <Image src={'/assets/google.svg'} width='20' height={20} ></Image>
                        </button>
                    </div>
                    <div className='input-button'>
                        <button type='button' className={styles.button_custom}>
                            Sign In With Github <Image src={'/assets/github.svg'} width='20' height={20}></Image>
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-400'>
                    Don't have an account yet? <Link className='text-blue-700' href={'/register'}>Sign Up</Link>
                </p>
            </section>
        </Layout>
    )
}