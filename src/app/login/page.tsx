'use client'

import jwt from 'jsonwebtoken';
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputField } from "@/components/InputField"
import { login } from "@/lib/api/auth"
import { isApiErrorResponse } from "@/types/common"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idErrorText, setIdErrorText] = useState<string>('');
  const [pwErrorText, setPwErrorText] = useState<string>('');
  const router = useRouter();

  const isButtonDisabled = !email || !password;

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      
      if (response.status === 200) {
        const accessToken = response.headers['authorization'].split(' ')[1];
        const decodedToken = jwt.decode(accessToken) as { exp: number };
        const expirationTime = new Date(decodedToken.exp * 1000).toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace('T', ' ');
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expirationTime', expirationTime);
        router.push('/');
      }
    } catch (error) {
      if (isApiErrorResponse(error)) {
        if (error.message === 'User not found') {
          setIdErrorText('해당 이메일의 아이디가 존재하지 않습니다.');
          setEmail('');
          setPassword('');
        } else if (error.message === 'Password mismatch') { 
          setPwErrorText('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
          setPassword('');
        }
      }
    }
  }

  useEffect(() => {
    if (password) setPwErrorText('');
  }, [password])

  return (
  <div className='flex justify-center items-center' style={{ height: 'calc(100vh - 70px)' }}>
    <main className='flex flex-col w-[432px] mx-5 gap-10'>
      <h1 className='text-2xl font-bold'>스터디 윗 미 로그인</h1>

      <section className='flex flex-col gap-5'>
        <InputField
          label="아이디"
          type="email"
          placeholder="아이디를 입력해 주세요."
          helperText='ex) studywithme@gmail.com'
          errorText={idErrorText}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          helperText=''
          errorText={pwErrorText}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='flex items-center gap-2'>
          <Checkbox id="remember" />
          <label htmlFor="remember" className='text-sm text-gray-light'>로그인 유지</label>
        </div>
      </section>

      <section className='flex flex-col gap-5'>
        <Button
        size={'lg'}
        className='w-full bg-black text-white'
        disabled={isButtonDisabled}
        onClick={handleLogin}
        >
          로그인
        </Button>
        <div className='flex justify-between px-10 text-gray-light text-sm'>
          <Link href='/find-id'>아이디 찾기</Link>
          <p>|</p>
          <Link href='/find-password'>비밀번호 찾기</Link>
          <p>|</p>
          <Link href='/join'>회원가입</Link>
        </div>
      </section>
    </main>
  </div>
  );
}
