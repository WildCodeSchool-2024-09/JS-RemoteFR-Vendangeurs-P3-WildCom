import { useState } from "react";
import { createPortal } from "react-dom";
import AddEventModal from "./AddEventModal";
import AddPostModal from "./AddPostModal";
import EditEventModal from "./EditEventModal";
import EditPostModal from "./EditPostModal";

interface ModalButtonProps {
  children: React.ReactNode;
  postId?: number;
  eventId?: number;
  type: string;
}

function ModalButton({ children, type, postId, eventId }: ModalButtonProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex justify-center items-center gap-3 text-text-primary rounded-xl font-text hover:text-accent-primary hover:drop-shadow-[0_2px_5px_rgba(65,242,77,0.75)]"
        type="button"
      >
        {children}
      </button>
      {showModal &&
        createPortal(
          <>
            {type === "post" && (
              <AddPostModal closeModal={() => setShowModal(false)} />
            )}
            {type === "event" && (
              <AddEventModal closeModal={() => setShowModal(false)} />
            )}
            {type === "editEvent" && (
              <EditEventModal
                eventId={eventId}
                closeModal={() => setShowModal(false)}
              />
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
