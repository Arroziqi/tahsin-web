import React from 'react';
import colors from '@/constants/colors';
import LogoNavbar from '../LogoNavbar';
import TextSectionNavbar from '@/components/text/TextSectionNavbar';
import ItemNavbar from '@/components/navbar/ItemNavbar';

function Navbar() {
  return (
    <div
      className={`flex flex-col gap-4 items-center w-[277px] h-screen py-5 px-6`}
      style={{ backgroundColor: colors.C02 }}
    >
      <LogoNavbar className={`mb-8`} />
      <div className="w-full gap-2 flex flex-col">
        <TextSectionNavbar text={`KELOLA PENGAJAR`} />
        <ItemNavbar text={'Tambah Pengajar'} />
        <ItemNavbar text={'Daftar Pengajar'} />
      </div>
    </div>
  );
}

export default Navbar;
