import React, { SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="absolute top-0 left-0 bottom-0 right-0 z-[100]  bg-black/50 backdrop-blur"></div>
      <div className="w-full h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[200] max-w-[500px] bg-white rounded-md">
        <div className="w-full p-4 relative">
          <AiOutlineClose
            onClick={() => onClose(false)}
            className="absolute rounded-full text-3xl hover:bg-gray-200 p-1 top-0 right-0 cursor-pointer"
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
