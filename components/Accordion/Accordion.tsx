import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between z-10 w-full items-center "
      >
        <p className="">{title}</p>
        <IoIosArrowUp
          className={`${
            isOpen ? 'rotate-0' : 'rotate-180'
          } transition-all duration-300 ease-in-out`}
        />
      </button>
      <div
        className={`w-full transition-all duration-300 ease-in-out grid overflow-hidden ${
          isOpen
            ? 'h-auto opacity-100'
            : 'translate-y-[-100%] opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={` p-2 transition-all duration-300 ease-in-out ${
            isOpen
              ? 'translate-y-0 opacity-100  transition-delay-150 ease-in-out'
              : 'translate-y-[-10%] opacity-0 hidden  transition-delay-150 ease-in-out'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
