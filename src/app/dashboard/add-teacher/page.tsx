'use client';

import React from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import CardView from '@/components/card/CardView';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import PasswordInputWithLabel from '@/components/input/PasswordInputWithLabel';
import PrimaryButton from '@/components/button/PrimaryButton';

function AddTeacherPage() {
  return (
    <div className={'relative z-1 w-full flex justify-center items-center flex-col bg-white'}>
      <Topbar title={'Kelola Pengajar'} username={'Anandita'} role={'Admin'} />
      <div className="w-full h-screen overflow-y-auto ">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title={'Tambah Pengajar Baru'} />
          <CardView className={'gap-7'}>
            <TextInputWithLabel
              labelClassName={'text-[16px]'}
              inputClassName={'py-[12px] px-[20px]'}
              placeholder={'Masukan nama lengkap pengajar'}
              label={'Name Lengkap*'}
              id={'name'}
              type={'text'}
            />
            <TextInputWithLabel
              labelClassName={'text-[16px]'}
              inputClassName={'py-[12px] px-[20px]'}
              placeholder={'Masukan username pengajar'}
              label={'Username*'}
              id={'username'}
              type={'text'}
            />
            <TextInputWithLabel
              labelClassName={'text-[16px]'}
              inputClassName={'py-[12px] px-[20px]'}
              placeholder={'Masukan email pengajar'}
              label={'Email*'}
              id={'email'}
              type={'text'}
            />
            <TextInputWithLabel
              labelClassName={'text-[16px]'}
              inputClassName={'py-[12px] px-[20px]'}
              placeholder={'+62'}
              label={'Nomor Telepon*'}
              id={'numberTelephone'}
              type={'text'}
            />
            <PasswordInputWithLabel
              labelClassName={'text-[16px]'}
              inputClassName={'py-[12px] px-[20px]'}
              placeholder={'Masukan password pengajar'}
              label={'Password*'}
              id={'password'}
              type={'password'}
            />
            <PasswordInputWithLabel
              labelClassName={'text-[16px]'}
              inputClassName={'py-[12px] px-[20px]'}
              placeholder={'Masukan konfirmasi password pengajar'}
              label={'Konfirmasi Password*'}
              id={'confirmPassword'}
              type={'password'}
            />
            <PrimaryButton text={'Tambahkan Pengajar'} onClick={() => {}} className={'w-full'} />
          </CardView>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherPage;
