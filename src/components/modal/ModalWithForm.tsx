import React from 'react';
import Modal from '@/components/modal/Modal';
import colors from '@/constants/colors';

interface ModalWithFormWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  title: string;
  formId?: string;
  children: React.ReactNode;
}

const ModalWithFormWrapper: React.FC<ModalWithFormWrapperProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  formId = 'default-form',
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg mr-2 text-gray-700 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            form={formId}
            onClick={onSubmit}
            className="px-4 py-2 hover:opacity-90 text-white rounded-lg cursor-pointer"
            style={{ backgroundColor: colors.C06 }}
          >
            Simpan
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-[19px]">{children}</div>
    </Modal>
  );
};

export default ModalWithFormWrapper;
