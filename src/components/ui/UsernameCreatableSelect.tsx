// components/input/UsernameCreatableSelect.tsx
'use client';

import React, { useEffect } from 'react';
import { useUsers } from '@/hooks/fetchData/user/useUsers';
import { SelectOptionType } from '@/components/input/SelectInput';
import CreatableSelect from '@/components/input/CreatableSelect';

interface UsernameCreatableSelectProps {
  value?: string;
  onChange: (username: string, userData?: { email: string; displayName: string }) => void;
  disabled?: boolean;
  onBlur?: () => void;
}

function UsernameCreatableSelect({
  value,
  onChange,
  disabled = false,
  onBlur,
}: Readonly<UsernameCreatableSelectProps>) {
  const { data: users, loading, refresh, error } = useUsers();

  // Only process user data when we actually have users
  const { userOptions, userDataMap } = React.useMemo(() => {
    if (users.length === 0) {
      return { userOptions: [], userDataMap: new Map() };
    }

    const options: SelectOptionType[] = [];
    const dataMap = new Map<string, { email: string; displayName: string }>();

    users.forEach((user) => {
      const displayName = (user as any).fullName || user.username;
      options.push({
        value: user.username,
        option: `${user.username}${user.email ? ` - ${user.email}` : ''}`,
      });
      dataMap.set(user.username, { email: user.email, displayName });
    });

    return { userOptions: options, userDataMap: dataMap };
  }, [users]);

  const handleChange = (selectedValue: string) => {
    const userData = userDataMap.get(selectedValue);
    onChange(selectedValue, userData);
  };

  const handleCreateOption = (newUsername: string) => {
    onChange(newUsername);
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  const noUsersFound = !loading && users.length === 0;
  const hasError = !!error;

  return (
    <div className="flex flex-col gap-[10px]">
      <CreatableSelect
        label="Username"
        options={userOptions}
        value={value} // Pass the value directly
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled || loading}
        placeholder={
          loading
            ? 'Memuat users...'
            : hasError
              ? 'Error memuat users. Ketik username manual'
              : noUsersFound
                ? 'Tidak ada user ditemukan. Ketik username baru'
                : 'Pilih user atau ketik username baru'
        }
        onCreateOption={handleCreateOption}
        onBlur={onBlur} // Pass onBlur through
      />

      {hasError && <div className="text-red-500 text-sm mt-1">Error: {error}</div>}
    </div>
  );
}

export default UsernameCreatableSelect;
