import React, { createContext, useContext, useState, ReactNode } from 'react';

type Dish = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  count: number;
  
};

const initialDishes: Dish[] = [
  {
    id: 1,
    name: 'Chocolate Cake',
    category: 'dessert',
    price: 5.99,
    image: 'https://images.pexels.com/photos/1998637/pexels-photo-1998637.jpeg',
    count: 0,
  },  
  { 
    id: 2, 
    name: 'Grilled Chicken', 
    category: 'main', 
    price: 12.99, 
    image: 'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg', 
    count: 0 
  },

  { 
    id: 4, 
    name: 'Steak', 
    category: 'main', 
    price: 14.99, 
    image: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg', 
    count: 0 
  },
  { 
  
    id: 5, 
    name: 'vegetarian Pizza', 
    category: 'starter', 
    price: 3.99, 
    image: 'https://images.pexels.com/photos/3915854/pexels-photo-3915854.jpeg', 
    count: 0 
  },
  { 
    id: 7, 
    name: 'Ice Cream Sundae', 
    category: 'dessert', 
    price: 4.49, 
    image: 'https://images.pexels.com/photos/1343501/pexels-photo-1343501.jpeg', 
    count: 0 
  },
  
  { 
    id: 10, 
    name: 'Umlet', 
    category: 'main', 
    price: 15.99, 
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 
    count: 0 
  },
  { 
    id: 11, 
    name: 'Pizza', 
    category: 'main', 
    price: 11.49, 
    image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg', 
    count: 0 
  },
 
  

  { 
    id: 15, 
    name: 'Spring Rolls', 
    category: 'starter', 
    price: 4.99, 
    image: 'https://images.pexels.com/photos/4553113/pexels-photo-4553113.jpeg', 
    count: 0 
  }
];


interface DishesContextType {
  dishes: Dish[];
  selectedDishes: Dish[];
  updateDishCount: (id: number, change: number) => void;  // Renamed function to match your implementation
  toggleSelection: (dish: Dish) => void;
  addDish: (newDish: Dish) => void;
}

const DishesContext = createContext<DishesContextType | undefined>(undefined);

interface DishesProviderProps {
  children: ReactNode;
}

export const DishesProvider: React.FC<DishesProviderProps> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  const updateDishCount = (id: number, change: number) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.id === id ? { ...dish, count: dish.count + change } : dish
      )
    );
  };

  const toggleSelection = (dish: Dish) => {
    setSelectedDishes((prevSelected) => {
      if (prevSelected.some((selectedDish) => selectedDish.id === dish.id)) {
        return prevSelected.filter((selectedDish) => selectedDish.id !== dish.id);
      } else {
        return [...prevSelected, dish];
      }
    });
  };

  const addDish = (newDish: Dish) => {
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  return (
    <DishesContext.Provider value={{ dishes, selectedDishes, updateDishCount, toggleSelection, addDish }}>
      {children}
    </DishesContext.Provider>
  );
};

export const useDishes = () => {
  const context = useContext(DishesContext);
  if (!context) {
    throw new Error('useDishes must be used within a DishesProvider');
  }
  return context;
};