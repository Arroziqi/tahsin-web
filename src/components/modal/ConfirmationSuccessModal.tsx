import Modal from '@/components/modal/Modal';
import Image from 'next/image';

interface ConfirmSuccessModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

function ConfirmSuccessModal({
  title,
  description,
  onClose,
  isOpen,
}: Readonly<ConfirmSuccessModalProps>) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 border border-gray-400 hover:border-gray-900 rounded-lg text-gray-700 hover:text-gray-900 cursor-pointer w-full"
          >
            Tutup
          </button>
        </>
      }
    >
      <div className="text-center">
        <Image
          src={'/icon/success.svg'}
          alt={'success icon'}
          width={84}
          height={84}
          objectFit={'cover'}
          className={`mx-auto mb-10`}
        />
        <p className={`font-semibold text-[16px]`}>{title}</p>
        <p className={`mt-3`}>{description}</p>
      </div>
    </Modal>
  );
}

export default ConfirmSuccessModal;
