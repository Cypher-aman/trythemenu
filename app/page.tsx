'use client';

import Image from 'next/image';
import DemoImage from '@/assets/images/demoImage.jpg';
import KiteImage from '@/assets/images/kiteImage.jpg';
import BannerImage from '@/components/BannerImage/BannerImage';
import FoodVideoImage from '@/assets/images/foodVideo.jpg';
import { IoSearchOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useCallback, useState } from 'react';
import { changeActiveCategory } from '@/redux/features/menuSlice';
import FoodAccordion from '@/components/Accordion/FoodAccordion/FoodAccordion';
import { SubCategory } from '@/utils/interface';
import { IoCartOutline } from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import WaiterModal from '@/components/Modal/WaiterModal/WaiterModal';
import { PiNotepadLight } from 'react-icons/pi';

export default function Home() {
  const categories = useAppSelector((state) => state.menu.data.categories);
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { ref, inView } = useInView();

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const menuItems = useAppSelector((state) => state.menu.data.activeCategory);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    dispatch(changeActiveCategory(category));
  };

  const fileredMenuItems = useCallback(
    (items: SubCategory[]) => {
      if (searchTerm === '') return items;

      return items
        .map((item) => ({
          ...item,
          foodItems: item.foodItems.filter((foodItem) =>
            foodItem.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((item) => item.foodItems.length > 0);
    },
    [searchTerm]
  );

  console.log(menuItems);

  return (
    <main className="flex justify-center h-screen">
      <section className="w-full gap-2 flex-col max-w-[400px]  bg-white min-h-screen overflow-y-scroll hide-scrollbar flex justify-start items-center">
        {!inView && (
          <div className="flex sticky top-0 z-50 shadow-md items-center gap-2 justify-center w-full bg-orange-500">
            <h1 className="text-white text-xl font-bold py-3 ">Try The Menu</h1>
            <div
              onClick={() => router.push('/cart')}
              className="absolute cursor-pointer right-3 top-[50%] translate-y-[-50%] "
            >
              <span className="text-white relative text-2xl">
                <IoCartOutline />
                {cart.length > 0 && (
                  <span className="absolute -right-2 -top-2 rounded-full bg-white text-black text-sm w-3 h-3 p-2  flex justify-center items-center">
                    {cart.length || ''}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
        <div className="w-full p-3 space-y-2  flex justify-start items-center flex-col">
          <h1 className="text-gray-500">
            Powered by <b>Try The Menu</b>
          </h1>
          <div
            ref={ref}
            className="p-2 gap-2 border-[1px] border-gray-500 rounded-md flex w-full"
          >
            <Image
              src={DemoImage}
              alt="demo"
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-md"
            />
            <div className="flex flex-col justify-center">
              <h2 className="font-semibold text-gray-800 text-lg">
                Try The Menu (Demo)
              </h2>
              <span className="text-gray-500 font-semibold text-sm">
                22Baker Street
              </span>
              <span className="text-gray-500 text-sm ">Asian, Continental</span>
            </div>
          </div>
          <BannerImage
            heading="Visit Our"
            subHeading="Food Social Media"
            imageSrc={FoodVideoImage}
          />
          <BannerImage
            heading="We wish you"
            subHeading="All happy makar sankranti"
            imageSrc={KiteImage}
          />
          <div className="text-center py-4 flex gap-2 items-center">
            <PiNotepadLight className="text-xl" />
            Menu
          </div>
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search for food"
              className="w-full bg-gray-300 rounded-md text-black p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoSearchOutline className="text-xl absolute right-3 top-1/2 translate-y-[-50%]" />
          </div>
          <div className="w-full flex justify-start gap-2 flex-wrap">
            {categories.length > 0 &&
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`text-gray-700 px-2 py-[2px] rounded-full font-mediium text-base border-[1px] border-gray-400 ${
                    activeCategory === category
                      ? 'bg-orange-500 text-white border-none'
                      : ''
                  }`}
                >
                  {category}
                </button>
              ))}
          </div>
          {menuItems &&
            fileredMenuItems(menuItems.subCategory).map((item) => (
              <FoodAccordion
                key={item.name}
                title={item.name}
                foodItems={item.foodItems}
              />
            ))}
        </div>
        <div className="absolute bottom-3">
          {cart.length > 0 ? (
            <button
              onClick={() => router.push('/cart')}
              className="px-4 py-2 rounded-md bg-green-600 text-white shadow-md font-medium"
            >
              View Cart
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-md bg-black text-white shadow-md font-medium"
            >
              Call Waiter
            </button>
          )}
        </div>
      </section>
      <WaiterModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </main>
  );
}
