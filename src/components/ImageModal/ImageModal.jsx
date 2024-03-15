import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement(document.getElementById("root"));
const ImageModal = ({ isOpen = false, photo, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeModal(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
      className={css.modal}
    >
      <img className={css.imgCard} src={photo.src} alt={photo.description} />
      <p>{photo.description}</p>
    </Modal>
  );
};

export default ImageModal;
