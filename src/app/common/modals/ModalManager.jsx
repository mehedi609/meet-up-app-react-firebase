import { useSelector } from 'react-redux';
import { selectModal } from 'app/common/modals/modalSlice';
import TestModal from 'features/sandbox/TestModal';
import LoginForm from 'features/auth/LoginForm';
import RegisterForm from 'features/auth/RegisterForm';

export default function ModalManager() {
  const modalComponents = {
    TestModal,
    LoginForm,
    RegisterForm,
  };

  const currentModalData = useSelector(selectModal);
  if (currentModalData) {
    const { modalType, modalProps } = currentModalData;
    const ModalComponent = modalComponents[modalType];
    return <ModalComponent {...modalProps} />;
  }

  return null;
}
