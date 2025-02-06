'use client'

import { InputField } from "@/components/InputField";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupMessages } from "@/utils/signup-messages";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string()
    .min(2, signupMessages.name)
    .regex(/^[가-힣a-zA-Z\s]+$/, signupMessages.name)
    .optional(),
  nickName: z.string().regex(/^[a-zA-Z0-9]+$/, signupMessages.nickName).optional(),
  email: z.string().email(signupMessages.email).optional(),
  authCode: z.string().optional(),
  password: z.string().min(8, signupMessages.password).max(20, signupMessages.password).optional(),
  passwordCheck: z.string().optional()
});


export default function Join() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

    return (
      <div className='flex justify-center items-center m-16'>
        <main className='flex flex-col w-[432px] mx-5 gap-10'>
          <h1 className='text-2xl font-bold'>스터디 윗 미 회원가입</h1>

          <FormProvider {...methods}>
          <section className='flex flex-col gap-5'>
          <InputField
              name="name"
              label="이름"
              type="text"
              placeholder="이름을 입력해 주세요."
              helperText={signupMessages.name}
            />
            <InputField
              name="nickName"

              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해 주세요."
              helperText={signupMessages.nickName}
              buttonText="중복 확인"

            />
            <InputField
              name="email"
              label="이메일"
              type="text"
              placeholder="ex)studywithme@gmail.com"
              buttonText="인증번호 받기"
            />
            <InputField
              name="authCode"

              label="인증번호 입력"
              type="text"
              placeholder="6자리 인증번호"
              maxLength={6}
              buttonText="확인"
            />
            <InputField

              name="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              helperText={signupMessages.password}
            />


            <InputField
              name="passwordCheck"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
            />
          </section>
          </FormProvider>
          <Button className="bg-blue-default">가입하기</Button>
        </main>
      </div>

    )
  }