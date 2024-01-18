import { FoodItem, SubCategory } from '@/utils/interface';
import Accordion from '../Accordion';
import FoodTray from '@/components/FoodTray/FoodTray';

const FoodAccordion = ({
  title,
  foodItems,
}: {
  title: string;
  foodItems: FoodItem[];
}) => {
  return (
    <Accordion title={title}>
      <ul className="space-y-4 w-full py-2">
        {foodItems.map((item) => (
          <li key={item.name}>
            <FoodTray item={item} />
          </li>
        ))}
      </ul>
    </Accordion>
  );
};

export default FoodAccordion;
