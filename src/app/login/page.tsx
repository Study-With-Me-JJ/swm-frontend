'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { InputField } from "@/components/InputField"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isButtonDisabled = !email || !password;

  return (
  <div className='flex justify-center items-center' style={{ height: 'calc(100vh - 70px)' }}>
    <main className='flex flex-col w-[432px] mx-5 gap-10'>
      <h1 className='text-2xl font-bold'>스터디 윗 미 로그인</h1>

      <section className='flex flex-col gap-5'>
        <InputField
          label="아이디"
          type="email"
          placeholder="아이디를 입력해 주세요."
          helperText="ex) studywithme@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
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
