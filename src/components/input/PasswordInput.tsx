import TextInput, { TextInputProps } from '@/components/input/TextInput';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import colors from '@/constants/colors';

function PasswordInput(props: Readonly<TextInputProps>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <TextInput
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`w-full pr-9 ${props.className ?? ''}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{ color: colors.C02 }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-700"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export default PasswordInput;
