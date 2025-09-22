'use client';

import React from 'react';
import Image from 'next/image';

type ToastStatus = 'info' | 'success' | 'warning' | 'error';

interface ToastInfoProps {
  status: ToastStatus;
  title?: string;
  message: string;
  subMessage?: string;
  icon?: string; // optional custom icon
  onClose?: () => void;
}

const statusColorMap: Record<ToastStatus, string> = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-red-500',
  error: 'bg-gray-700',
};

const defaultIconMap: Record<ToastStatus, string> = {
  info: '/icon/info.svg',
  success: '/icon/success.svg',
  warning: '/icon/warning.svg',
  error: '/icon/error.svg',
};

export default function ToastInfo({
  status,
  title,
  message,
  subMessage,
  icon,
  onClose,
}: ToastInfoProps) {
  const color = statusColorMap[status];
  const iconSrc = icon ?? defaultIconMap[status];

  return (
    <div
      className={`fixed bottom-5 right-5 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${color}`}
    >
      <Image
        src={iconSrc}
        alt={status}
        width={32}
        height={32}
        quality={100}
        priority
        loading="eager"
        unoptimized
      />
      <div className="flex flex-col">
        {title && <p className="font-semibold">{title}</p>}
        <p>{message}</p>
        {subMessage && <p className="text-sm mt-1 opacity-90">{subMessage}</p>}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-3 text-white/80 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
      )}
    </div>
  );
}
