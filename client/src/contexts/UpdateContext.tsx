import { createContext, useContext, useState } from "react";

type UpdateProviderType = {
  children: React.ReactNode;
};

type UpdateContextType = {
  updateComment: number;
  setUpdateComment: React.Dispatch<React.SetStateAction<number>>;
  updateLike: number;
  setUpdateLike: React.Dispatch<React.SetStateAction<number>>;
  updatePost: number;
  setUpdatePost: React.Dispatch<React.SetStateAction<number>>;
  updateEvent: number;
  setUpdateEvent: React.Dispatch<React.SetStateAction<number>>;
  updateParticipation: number;
  setUpdateParticipation: React.Dispatch<React.SetStateAction<number>>;
  updateUser: number;
  setUpdateUser: React.Dispatch<React.SetStateAction<number>>;
  updateCategories: number;
  setUpdateCategories: React.Dispatch<React.SetStateAction<number>>;
};

const UpdateContext = createContext<UpdateContextType | undefined>(undefined);

export const UpdateProvider = ({ children }: UpdateProviderType) => {
  const [updateComment, setUpdateComment] = useState(0);
  const [updateLike, setUpdateLike] = useState(0);
  const [updatePost, setUpdatePost] = useState(0);
  const [updateEvent, setUpdateEvent] = useState(0);
  const [updateParticipation, setUpdateParticipation] = useState(0);
  const [updateUser, setUpdateUser] = useState(0);
  const [updateCategories, setUpdateCategories] = useState(0);

  return (
    <UpdateContext.Provider
      value={{
        updateComment,
        setUpdateComment,
        updateLike,
        setUpdateLike,
        updatePost,
        setUpdatePost,
        updateEvent,
        setUpdateEvent,
        updateParticipation,
        setUpdateParticipation,
        updateUser,
        setUpdateUser,
        updateCategories,
        setUpdateCategories,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => {
  const context = useContext(UpdateContext);
  if (!context) {
    throw new Error("useUpdate must be used within an UpdateProvider");
  }
  return context;
};
