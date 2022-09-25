import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from 'app/common/modals/modalSlice';

export default function ModalWrapper({
  children,
  size = 'mini',
  header = 'Default Header',
}) {
  const dispatch = useDispatch();

  return (
    <Modal
      open={true}
      onClose={() => dispatch(closeModal())}
      size={size}
      closeOnEscape={true}
      closeOnDimmerClick={true}
      dimmer="blurring"
      closeIcon
    >
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
