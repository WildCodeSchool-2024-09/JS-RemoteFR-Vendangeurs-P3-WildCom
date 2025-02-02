import { useState } from "react";
import { createPortal } from "react-dom";
import EditPostModal from "./EditPostModal";
import EventModal from "./EventModal";
import PostModal from "./PostModal";

interface ModalButtonProps {
  children: React.ReactNode;
  postId?: number;
  type: string;
}

function ModalButton({ children, type, postId }: ModalButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex justify-center items-center gap-3 text-text-primary rounded-xl font-text font-semibold text-lg hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
        type="button"
      >
        {children}
      </button>
      {showModal &&
        createPortal(
          <>
            {type === "post" && (
              <PostModal closeModal={() => setShowModal(false)} />
            )}
            {type === "event" && (
              <EventModal closeModal={() => setShowModal(false)} />
            )}
            {type === "editPost" && (
              <EditPostModal
                postId={postId ? postId : 0}
                closeModal={() => setShowModal(false)}
              />
            )}
          </>,
          document.body,
        )}
    </>
  );
}

export default ModalButton;
