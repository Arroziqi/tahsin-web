'use client';

import React, { useState } from 'react';
import PrimaryButton from '@/components/button/PrimaryButton';
import Copyrigth from '@/components/Copyrigth';
import CardView from '@/components/card/CardView';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import PasswordInputWithLabel from '@/components/input/PasswordInputWithLabel';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/lib/auth/auth';
import { validatePassword, validateUsername } from '@/lib/validation/userValidation';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const router = useRouter();

  const isFormValid = username && password && !usernameError && !passwordError;

  return (
    <div className={'w-screen h-screen flex justify-center items-center flex-row bg-white'}>
      <div className="bg-white w-1/2 items-center flex flex-col">
        <CardView className={`bg-white w-[360px] mb-9`}>
          {/*<SelectInputWithLabel*/}
          {/*  label={'Masuk Sebagai'}*/}
          {/*  options={[*/}
          {/*    { option: 'Option 1', value: '1' },*/}
          {/*    { option: 'Option 2', value: '2' },*/}
          {/*    { option: 'Option 3', value: '3' },*/}
          {/*  ]}*/}
          {/*/>*/}
          <TextInputWithLabel
            label={'Username'}
            id={'username'}
            type={'text'}
            onChange={(e) => {
              const val = e.target.value;
              setUsername(val);
              setUsernameError(validateUsername(val));
            }}
            validate={validateUsername}
          />
          <PasswordInputWithLabel
            label={'Password'}
            id={'password'}
            type={'password'}
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              setPasswordError(validatePassword(val));
            }}
            validate={validatePassword}
          />
        </CardView>
        <PrimaryButton
          width={360}
          text={'Masuk'}
          onClick={() => handleLogin(username, password, router)}
          disabled={!isFormValid}
        />
        <Copyrigth className={`mt-[20%]`} />
      </div>
      <div className="bg-[url(/img/alquran.svg)] w-1/2 h-screen bg-center px-[100px] flex justify-center items-center flex-col">
        <div className="">
          <h1 className={'text-2xl text-white'}>
            Selamat Datang di <span className={'font-extrabold'}>Tahsin App</span>
          </h1>
          <hr className={'w-[55%] my-3 text-white'} />
          <p className={'text-white text-[16px] text-justify'}>
            Platform pembelajaran Al-Quran online yang menghubungkan Anda dengan pengajar
            berpengalaman. Tingkatkan kualitas bacaan Al-Quran Anda dengan metode yang sistematis
            dan menyenangkan.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
