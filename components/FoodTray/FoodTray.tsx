import { FoodItem } from '@/utils/interface';
import Image from 'next/image';
import CutleryImage from '@/assets/images/cutlery.svg';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '@/redux/features/cartSlice';

const FoodTray = ({ item }: { item: FoodItem }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

  const handleAddToCart = (item: FoodItem) => {
    console.log('item-added');
    dispatch(
      addToCart({
        id: item.id,
        item,
        quantity: 1,
      })
    );
  };

  return (
    <div className="w-full p-2 shadow-xl border-[1px] border-gray-400 rounded-md relative overflow-hidden flex">
      <div className="flex-grow py-4">
        <h3 className="text-[#333] font-semibold leading-[1.3]">{item.name}</h3>
        <div className="w-fit flex text-xs mb-1 text-gray-500 items-center gap-1">
          <div
            className={`flex justify-center w-3 h-3 items-center border-[1px] border-gray-300 ${
              item.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            <span className="w-1 h-1 bg-white rounded-full"></span>
          </div>
          servers {item.servings}
        </div>
        <p className="text-xl mb-1 text-[#333] font-semibold"> ₹{item.price}</p>
        <div>
          <p className="text-gray-500 text-xs">{item.description}</p>
          <span className="text-green-500 text-xs -mt-1 block">more</span>
        </div>
      </div>
      <div className="w-[130px] aspect-square h-[130px] relative overflow-hidden">
        <Image
          src={CutleryImage}
          alt="cutlery"
          fill
          className="rounded-full object-contain"
        />
        {itemInCart ? (
          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] text-white flex gap-4 p-1 rounded-sm bg-green-600">
            <button onClick={() => dispatch(decrementQuantity(item.id))}>
              -
            </button>
            <span>{itemInCart.quantity}</span>
            <button onClick={() => dispatch(incrementQuantity(item.id))}>
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(item)}
            className="absolute bottom-0 left-[50%] translate-x-[-50%] bg-green-600 text-white rounded-sm py-1 px-3"
          >
            Add
          </button>
        )}
      </div>
      {item.isBestseller && (
        <div className="bg-black text-white text-xs py-[2px] px-1 rounded-br-sm absolute left-0 top-0">
          Bestseller
        </div>
      )}
    </div>
  );
};

export default FoodTray;
