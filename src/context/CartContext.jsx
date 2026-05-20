import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const CartContext =
  createContext();

const CartProvider = ({
  children,
}) => {

  /* LOAD CART FROM LOCAL STORAGE */

  const [cartItems, setCartItems] =
    useState(() => {

      try {

        const storedCart =
          localStorage.getItem("cart");

        return storedCart
          ? JSON.parse(storedCart)
          : [];

      } catch (error) {

        console.error(
          "Cart loading error:",
          error
        );

        return [];

      }

    });

  /* SAVE CART */

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  /* ADD TO CART */

  const addToCart = (product) => {

    setCartItems((prevCart) => {

      const existingItem =
        prevCart.find(
          (item) =>
            item.id === product.id
        );

      /* IF PRODUCT ALREADY EXISTS */

      if (existingItem) {

        return prevCart.map(
          (item) =>

            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );

      }

      /* ADD NEW PRODUCT */

      return [

        ...prevCart,

        {
          ...product,
          quantity: 1,
        },

      ];

    });

  };

  /* REMOVE PRODUCT */

  const removeFromCart = (
    id
  ) => {

    setCartItems((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id
      )
    );

  };

  /* INCREASE QUANTITY */

  const increaseQty = (id) => {

    setCartItems((prevCart) =>

      prevCart.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )

    );

  };

  /* DECREASE QUANTITY */

  const decreaseQty = (id) => {

    setCartItems((prevCart) =>

      prevCart.map((item) =>

        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )

    );

  };

  /* CLEAR CART */

  const clearCart = () => {

    setCartItems([]);

  };

  /* TOTAL ITEMS */

  const totalItems = useMemo(() => {

    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }, [cartItems]);

  /* TOTAL PRICE */

  const totalPrice = useMemo(() => {

    return cartItems.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );

  }, [cartItems]);

  return (

    <CartContext.Provider
      value={{

        /* STATE */

        cartItems,

        /* ACTIONS */

        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,

        /* TOTALS */

        totalItems,
        totalPrice,

      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export default CartProvider;