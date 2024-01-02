import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { ShoppingCart } from "./ShoppingCart";
import { useLocalStorage } from "./useLocalStorage";

const ShoppingCartContext = createContext({} as ShoppingCartContext)


type shoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number;
    name: string;
    price: number;
    quentity: number;
    restaurantId: number;
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuentity: (id: number) => number;
    increaseItemQuentity: (id: number, name: string, price:number, restaurantId:number) => void;
    decreaseItemQuentity: (id: number) => void;
    removeItem: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
    emptyCart: () => void
}


export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: shoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
      )

      const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quentity + quantity,
        0
      )
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuentity(id: number) {
        return cartItems.find((item: { id: number }) => item.id === id)?.quentity ?? 0;
    }

    function increaseItemQuentity(id: number, name: string , price: number, restaurantId: number) {
        if(cartItems.find(items => items.restaurantId != restaurantId) != null) {
            alert("You can not add products from different restaurants!")
            return null;
        }

        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, name: name, price: price, quentity: 1, restaurantId: restaurantId }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quentity: item.quentity + 1 };
                    }
                    return item;
                });
            }
        });
    }

    function decreaseItemQuentity(id: number) {
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id)?.quentity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quentity: item.quentity - 1 };
                    }
                    return item;
                });
            }
        });
    }

    function removeItem(id: number) {
        setCartItems((currItems) => currItems.filter(item => item.id !== id));
    }

    function emptyCart() {
        setCartItems([])
    }


    return (
        <ShoppingCartContext.Provider value={{ getItemQuentity, increaseItemQuentity, decreaseItemQuentity, removeItem, openCart, closeCart, cartItems, cartQuantity, emptyCart }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}