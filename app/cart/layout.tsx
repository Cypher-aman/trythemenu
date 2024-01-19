'use client';

import { useRouter } from 'next/navigation';
import { HiArrowSmallLeft } from 'react-icons/hi2';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <main className="flex justify-center h-screen">
      <section className="w-full gap-2 flex-col max-w-[400px] bg-white min-h-screen overflow-y-scroll hide-scrollbar flex justify-start items-center">
        <div className="flex relative items-center gap-2 justify-center w-full bg-orange-500">
          <HiArrowSmallLeft
            onClick={() => router.back()}
            className="text-white text-xl cursor-pointer absolute left-3 top-[50%] translate-y-[-50%]"
          />
          <h1 className="text-white py-4">Cart</h1>
        </div>
        {children}
      </section>
    </main>
  );
};

export default Layout;
