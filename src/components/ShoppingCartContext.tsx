import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { ShoppingCart } from "./ShoppingCart";

const ShoppingCartContext = createContext({} as ShoppingCartContext)


type shoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number;
    quentity: number;
}

type ShoppingCartContext = {
    getItemQuentity: (id: number) => number;
    increaseItemQuentity: (id: number) => void;
    decreaseItemQuentity: (id: number) => void;
    removeItem: (id: number) => void;
}


export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}: shoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuentity(id: number) {
        return cartItems.find((item: { id: number }) => item.id === id)?.quentity ?? 0;
    }

    function increaseItemQuentity(id: number) {
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quentity: 1}];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quentity: item.quentity + 1};
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
                        return {...item, quentity: item.quentity - 1};
                    }
                    return item;
                });
            }
        });
    }

    function removeItem(id: number) {
        setCartItems((currItems) => {
            return currItems.filter(item => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider value={{getItemQuentity, increaseItemQuentity, decreaseItemQuentity, removeItem}}>
            {children}
            <ShoppingCart isOpen={false}></ShoppingCart>
        </ShoppingCartContext.Provider>
    )
}