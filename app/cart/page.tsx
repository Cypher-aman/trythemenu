'use client';

import { useAppSelector, useAppDispatch } from '@/redux/store';
import {
  selectTotalPrice,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '@/redux/features/cartSlice';
import toast from 'react-hot-toast';

const CartPage = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  const onOrderPlace = () => {
    toast.loading('Placing order...', { id: '2' });
    setTimeout(() => {
      toast.success('Order placed!', { id: '2' });
      dispatch(clearCart());
    }, 500);
  };

  if (cart.length === 0) {
    return <div className="py-10">Cart is empty</div>;
  }
  return (
    <>
      <div className="w-full relative h-svh">
        <div className="flex  p-3 w-full flex-col items-start gap-2">
          <h3 className="text-gray-700 font-semibold">Items:</h3>
          {cart.map((item) => {
            const foodItem = item.item;
            return (
              <div
                key={item.id}
                className="w-full border-[1px] flex justify-between gap-2 border-gray-300 rounded-md p-3"
              >
                <div>
                  <div
                    className={`flex justify-center w-3 h-3 items-center border-[1px] border-gray-300 ${
                      foodItem.isVeg
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                  </div>
                  <h3 className="text-gray-700 font-semibold">
                    {foodItem.name}
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#333] text-xl font-semibold">
                    ₹{foodItem.price * item.quantity}
                  </p>
                  <div className="flex gap-4 p-1 rounded-sm bg-green-600 text-white">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-3 w-full space-y-2 absolute bottom-1">
          <div className="flex justify-between bg-gray-200 rounded-md p-2 ">
            <span className="font-semibold">Total:</span>
            <span className=" font-semibold">₹{totalPrice}</span>
          </div>
          <div className="w-full bg-green-700 rounded-md p-2">
            <button
              onClick={onOrderPlace}
              className="w-full text-white font-bold"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
