import React from 'react';
import colors from '@/constants/colors';
import LogoNavbar from '../LogoNavbar';
import TextSectionNavbar from '@/components/text/TextSectionNavbar';
import ItemNavbar from '@/components/navbar/ItemNavbar';
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col gap-4 items-center w-[320px] h-screen py-5 px-6`}
      style={{ backgroundColor: colors.C02 }}
    >
      <LogoNavbar className={`mb-8`} />
      <div className="w-full gap-2 flex flex-col">
        <TextSectionNavbar text={`KELOLA PENGAJAR`} />
        <ItemNavbar
          text={'Tambah Pengajar'}
          onClick={() => router.push('/dashboard/add-teacher')}
        />
        <ItemNavbar
          text={'Daftar Pengajar'}
          onClick={() => router.push('/dashboard/list-teacher')}
        />
        <TextSectionNavbar text={`KELOLA KELAS`} />
        <ItemNavbar
          text={'Pengaturan Kelas'}
          onClick={() => router.push('/dashboard/class-management')}
        />
        <ItemNavbar
          text={'Tambah Jadwal'}
          onClick={() => router.push('/dashboard/class-management/schedule')}
        />
      </div>
    </div>
  );
}

export default Navbar;
