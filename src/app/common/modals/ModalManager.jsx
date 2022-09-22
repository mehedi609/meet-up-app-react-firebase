import { useSelector } from 'react-redux';
import { selectModal } from './modalSlice';
import TestModal from 'features/sandbox/TestModal';
import LoginForm from 'features/auth/LoginForm';

export default function ModalManager() {
  const modalComponents = {
    TestModal,
    LoginForm,
  };

  const currentModalData = useSelector(selectModal);
  if (currentModalData) {
    const { modalType, modalProps } = currentModalData;
    const ModalComponent = modalComponents[modalType];
    return <ModalComponent {...modalProps} />;
  }

  return null;
}
