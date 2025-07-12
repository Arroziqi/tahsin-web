'use client';

import React, { useState } from 'react';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import CardView from '@/components/card/CardView';
import TextInputWithLabel, { TextInputWithLabelProps } from '@/components/input/TextInputWithLabel';
import PasswordInputWithLabel from '@/components/input/PasswordInputWithLabel';
import PrimaryButton from '@/components/button/PrimaryButton';
import API from '@/lib/utils/axios';
import axios from 'axios';
import {
  validateConfirmPassword,
  validatePassword,
  validateUsername,
} from '@/lib/validation/userValidation';

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
  const [payloads, setPayloads] = useState<createUserTeacherPayloads>({
    name: '',
    username: '',
    email: '',
    noTelp: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (id === 'confirmPassword') {
      setConfirmPassword(value);
      setConfirmPasswordError(validateConfirmPassword(payloads.password, value));
      return;
    }

    if (id === 'username') {
      setUsernameError(validateUsername(value));
    }

    if (id === 'password') {
      setPasswordError(validatePassword(value));
    }

    setPayloads((prev) => ({
      ...prev,
      [id === 'numberTelephone' ? 'noTelp' : id]: value,
    }));

    if (id === 'password') {
      setConfirmPasswordError(validateConfirmPassword(value, confirmPassword));
    }
  };

  const resetForm = () => {
    setPayloads({
      name: '',
      username: '',
      email: '',
      noTelp: '',
      password: '',
    });
    setConfirmPassword('');
    setUsernameError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setError(null);
  };

  const isFormValid =
    payloads.name &&
    payloads.username &&
    payloads.email &&
    payloads.noTelp &&
    payloads.password &&
    confirmPassword &&
    !usernameError &&
    !passwordError &&
    !confirmPasswordError;

  const handleSubmit = async () => {
    setError(null);

    if (!isFormValid) {
      setError('Mohon periksa kembali isian form Anda.');
      return;
    }

    try {
      await API.post('/admin/api/teacher/createUserTeacher', payloads);
      alert('Pengajar berhasil ditambahkan');
      resetForm();
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
      <div className="w-full h-screen overflow-y-auto">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title={'Tambah Pengajar Baru'} />
          <CardView className={'gap-7'}>
            {inputList.map((input) =>
              input.type === 'password' ? (
                <PasswordInputWithLabel
                  key={input.id}
                  {...input}
                  value={input.id === 'password' ? payloads.password : confirmPassword}
                  onChange={(e) => handleChange(input.id, e)}
                  validate={
                    input.id === 'password'
                      ? validatePassword
                      : (val) => validateConfirmPassword(payloads.password, val)
                  }
                />
              ) : (
                <TextInputWithLabel
                  key={input.id}
                  {...input}
                  value={
                    input.id === 'username'
                      ? payloads.username
                      : input.id === 'email'
                        ? payloads.email
                        : input.id === 'name'
                          ? payloads.name
                          : input.id === 'numberTelephone'
                            ? payloads.noTelp
                            : ''
                  }
                  onChange={(e) => handleChange(input.id, e)}
                  validate={input.id === 'username' ? validateUsername : undefined}
                />
              )
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <PrimaryButton
              text={'Tambahkan Pengajar'}
              onClick={handleSubmit}
              className={'w-full'}
              disabled={!isFormValid}
            />
          </CardView>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherPage;
