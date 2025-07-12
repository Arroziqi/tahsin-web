import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import Image from 'next/image';

interface ConfirmDeleteModalProps {
  item: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteModal({ item, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  const [open, setOpen] = useState(true);

  const handleDelete = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false);
        onCancel();
      }}
      footer={
        <>
          <button
            onClick={() => {
              setOpen(false);
              onCancel();
            }}
            className="px-4 py-2 mr-2 border rounded-lg text-gray-700 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
          >
            Ya, Hapus
          </button>
        </>
      }
    >
      <div className="text-center">
        <Image
          src={'/icon/warning.svg'}
          alt={'warning icon'}
          width={84}
          height={84}
          objectFit={'cover'}
          className={`mx-auto mb-10`}
        />
        <p className={`font-semibold text-[16px]`}>Konfirmasi Hapus {item}</p>
        <p className={`mt-3`}>
          Apakah Anda yakin ingin menghapus {item} ini? Tindakan ini tidak dapat dibatalkan.
        </p>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
