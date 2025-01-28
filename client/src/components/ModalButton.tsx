import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import PostModal from "./PostModal";

function ModalButton({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex justify-center items-center bg-accent-primary hover:bg-accent-primaryhover px-3 py-2 rounded-xl font-title font-semibold text-lg"
        type="button"
      >
        {children}
      </button>
      {showModal &&
        createPortal(
          <PostModal closeModal={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}

export default ModalButton;
