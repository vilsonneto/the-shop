import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface IItem {
  name: string;
  image_url: string;
  price: number;
  description: string;
  id: number;
}

interface ICartProviderProps {
  children: ReactNode;
}

interface ICartProviderData {
  cart: IItem[];
  setCart: React.Dispatch<React.SetStateAction<[]>>;
}

const CartContext = createContext<ICartProviderData>({} as ICartProviderData);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [cart, setCart] = useState<[]>([]);

  useEffect(() => {
    const myCart = localStorage.getItem("cart");
    if (myCart !== null) {
      setCart(JSON.parse(myCart));
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
