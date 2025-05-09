'use client';

import React from 'react';
import PrimaryButton from '@/components/button/PrimaryButton';
import Copyrigth from '@/components/Copyrigth';
import CardView from '@/components/card/CardView';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import PasswordInputWithLabel from '@/components/input/PasswordInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';

function LoginPage() {
  return (
    <div className={'w-screen h-screen flex justify-center items-center flex-row bg-white'}>
      <div className="bg-white w-1/2 items-center flex flex-col">
        <CardView className={`bg-white w-[360] mb-9`}>
          <SelectInputWithLabel
            label={'Masuk Sebagai'}
            options={[
              { option: 'Option 1', value: '1' },
              { option: 'Option 2', value: '2' },
              { option: 'Option 3', value: '3' },
            ]}
          />
          <TextInputWithLabel label={'Username'} id={'username'} type={'text'} />
          <PasswordInputWithLabel label={'Password'} id={'password'} type={'password'} />
        </CardView>
        <PrimaryButton text={'Masuk'} onClick={() => console.log('masuk')} />
        <Copyrigth className={`mt-[20%]`} />
      </div>
      <div className="bg-[url(/img/alquran.svg)] w-1/2 h-screen bg-center px-[100] flex justify-center items-center flex-col">
        <div className="">
          <h1 className={'text-2xl text-white'}>
            Selamat Datang di <span className={'font-extrabold'}>Tahsin App</span>{' '}
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
