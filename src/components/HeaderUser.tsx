'use client'

import Link from "next/link"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/app/_lib/getUserInfo";
import { logout } from "@/lib/api/auth";
export default function HeaderUser() {  
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const router = useRouter(); 

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); 
        setIsLoggedIn(!!token);  
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('로그아웃 에러:', error);
        } finally { 
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expirationTime');
            router.push('/');
        }
    };

    const { data } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => getUserInfo(),
    });

    // console.log('userInfo', data);

    return (
        <div className='flex gap-2 items-center'>
            {!isLoggedIn ? (
                <>
                    <Link href='/join' className='text-xs font-medium text-gray-default bg-[#e9e9e9] rounded-[4px] py-[6px] px-[12px]'>회원가입</Link>
                    <Link href='/login' className='text-xs font-medium text-gray-default bg-[#e9e9e9] rounded-[4px] py-[6px] px-[12px]'>로그인</Link> 
                </>
            ) : (
                <>
                    <div className='flex items-center gap-2 text-sm font-regular text-gray-default'>
                        <p><Image src={data?.data?.profileImageUrl || '/icons/icon_no_profile.svg'} alt='profile' width={18} height={18} /></p>
                        <Link href='/mypage' className='text-link-default font-bold'>{data?.data?.nickname} 님</Link> 환영합니다.
                    </div>
                    <button className='text-xs font-medium text-gray-default bg-[#e9e9e9] rounded-[4px] py-[6px] px-[12px]' onClick={handleLogout}>로그아웃</button> 
                </>
            )}
        </div>
    )
}   