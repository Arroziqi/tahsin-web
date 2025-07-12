import React from 'react';
import ReactDOM from 'react-dom';
import colors from '@/constants/colors';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`bg-white w-full ${sizeClasses[size]} rounded-lg shadow-lg overflow-hidden pb-2`}
        style={{ color: colors.C02 }}
      >
        <div className="flex justify-between items-center px-6 pt-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {showCloseButton && (
            <button onClick={onClose} className="text-[#1D1B20] hover:text-black cursor-pointer">
              ✕
            </button>
          )}
        </div>

        <div className="px-6 py-4">{children}</div>

        {footer && <div className="px-6 py-3 bg-gray-50 text-right">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
