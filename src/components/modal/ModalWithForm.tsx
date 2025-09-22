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
  submitting?: boolean;
}

const ModalWithFormWrapper: React.FC<ModalWithFormWrapperProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  formId = 'default-form',
  children,
  submitting = false,
}) => {
  return (
    <Modal
      size={'xl'}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg mr-2 text-gray-700 cursor-pointer"
            disabled={submitting}
          >
            Batal
          </button>
          <button
            type="submit"
            form={formId}
            onClick={onSubmit}
            disabled={submitting}
            className="px-4 py-2 hover:opacity-90 text-white rounded-lg cursor-pointer"
            style={{ backgroundColor: colors.C06 }}
          >
            {submitting ? 'Menyimpan…' : 'Simpan'}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-[19px]">{children}</div>
    </Modal>
  );
};

export default ModalWithFormWrapper;
