import { BannerImageProps } from '@/utils/interface';
import Image from 'next/image';

const BannerImage: React.FC<BannerImageProps> = (props) => {
  const { heading, subHeading, imageSrc } = props;
  return (
    <div className="w-full min-h-[110px] h-[110px] relative rounded-md overflow-clip">
      <Image
        fill
        objectFit="cover"
        alt="social-advertisement"
        src={imageSrc}
        className="rounded-md"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 py-6 px-3 text-white text-xl bg-black/40 backdrop-blur-[1px]">
        <h3 className="mb-2 ">{heading}</h3>
        <span className="font-bold ">{subHeading}</span>
      </div>
    </div>
  );
};

export default BannerImage;
