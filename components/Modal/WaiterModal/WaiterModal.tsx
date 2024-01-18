import React, { SetStateAction } from 'react';
import Modal from '../Modal';
import toast from 'react-hot-toast';

const suggestions = ['Bring Water', 'Send Bill', 'Visit Table'];

const WaiterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = React.useState('');

  const onSubmit = () => {
    toast.loading('Calling waiter...', { id: '1' });
    setTimeout(() => {
      toast.success('Call successfull!', { id: '1' });
      onClose(false);
    }, 500);
  };

  if (!isOpen) return null;
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col py-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Type a message for waiter..."
          className="w-full border-b-[1px] border-black outline-none p-1"
        />
        <div className="flex gap-2 items-center py-4">
          Suggestions:{' '}
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setQuery(suggestion)}
              className="px-3 py-[2px] text-sm border-[1px] border-gray-900 rounded-full"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <div className="flex w-full justify-end mt-4">
          <button
            disabled={!query}
            onClick={onSubmit}
            className="text-green-500 hover:bg-green-200 py-2 px-4 disabled:cursor-not-allowed rounded"
          >
            Call
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WaiterModal;
