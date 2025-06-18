'use client';

import React from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import CardView from '@/components/card/CardView';
import TextInputWithLabel, { TextInputWithLabelProps } from '@/components/input/TextInputWithLabel';
import PasswordInputWithLabel from '@/components/input/PasswordInputWithLabel';
import PrimaryButton from '@/components/button/PrimaryButton';
import API from '@/lib/utils/axios';
import axios from 'axios';

interface createUserTeacherPayloads {
  name: string;
  username: string;
  email: string;
  noTelp: string;
  password: string;
}

const inputList: TextInputWithLabelProps[] = [
  {
    label: 'Nama Lengkap*',
    id: 'name',
    type: 'text',
    placeholder: 'Masukan nama lengkap pengajar',
  },
  {
    label: 'Username*',
    id: 'username',
    type: 'text',
    placeholder: 'Masukan username pengajar',
  },
  {
    label: 'Email*',
    id: 'email',
    type: 'text',
    placeholder: 'Masukan email pengajar',
  },
  {
    label: 'Nomor Telepon*',
    id: 'numberTelephone',
    type: 'text',
    placeholder: '+62',
  },
  {
    label: 'Password*',
    id: 'password',
    type: 'password',
    placeholder: 'Masukan password pengajar',
  },
  {
    label: 'Konfirmasi Password*',
    id: 'confirmPassword',
    type: 'password',
    placeholder: 'Masukan konfirmasi password pengajar',
  },
];

function AddTeacherPage() {
  const [payloads, setPayloads] = React.useState<createUserTeacherPayloads>({
    name: '',
    username: '',
    email: '',
    noTelp: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (id === 'confirmPassword') {
      setConfirmPassword(value);
      return;
    }

    setPayloads((prev) => ({
      ...prev,
      [id === 'numberTelephone' ? 'noTelp' : id]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);

    if (payloads.password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      return;
    }

    try {
      const res = await API.post('/admin/api/teacher/createUserTeacher', payloads);

      alert('Pengajar berhasil ditambahkan');
      console.log(res.data.data);
    } catch (err) {
      console.error('Gagal menambahkan pengajar:', err);
      const message =
        axios.isAxiosError(err) && err.response?.data?.errors.message
          ? err.response.data.message
          : 'Terjadi kesalahan';
      setError(message);
    }
  };

  return (
    <div className={'relative z-1 w-full flex justify-center items-center flex-col bg-white'}>
      <Topbar title={'Kelola Pengajar'} />
      <div className="w-full h-screen overflow-y-auto ">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title={'Tambah Pengajar Baru'} />
          <CardView className={'gap-7'}>
            {inputList.map((input) =>
              input.type === 'password' ? (
                <PasswordInputWithLabel
                  key={input.id}
                  {...input}
                  onChange={(e) => handleChange(input.id, e)}
                />
              ) : (
                <TextInputWithLabel
                  key={input.id}
                  {...input}
                  onChange={(e) => handleChange(input.id, e)}
                />
              )
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <PrimaryButton
              text={'Tambahkan Pengajar'}
              onClick={handleSubmit}
              className={'w-full'}
            />
          </CardView>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherPage;
