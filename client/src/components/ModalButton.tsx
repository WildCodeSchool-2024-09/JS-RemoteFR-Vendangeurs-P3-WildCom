import { type ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import PostModal from "./PostModal";

function ModalButton({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex justify-center items-center gap-3 text-text-primary px-3 py-2 rounded-xl font-text font-semibold text-lg hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
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
