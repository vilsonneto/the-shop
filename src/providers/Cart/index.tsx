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
  description?: string;
  id: number;
}

interface ICartProviderProps {
  children: ReactNode;
}

interface ICartProviderData {
  cart: IItem[];
  addCart: (product: IItem) => void;
}

const CartContext = createContext<ICartProviderData>({} as ICartProviderData);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const [cart, setCart] = useState<IItem[]>([]);

  console.log(cart);

  useEffect(() => {
    const myCart = localStorage.getItem("cart");
    if (myCart !== null) {
      setCart(JSON.parse(myCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCart = (product: IItem) => {
    const newCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
