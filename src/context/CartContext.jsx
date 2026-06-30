import {
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import { cartAPI } from "../utils/api";
import { AuthContext } from "./authContextValue";
import { CartContext } from "./cartContextValue";

const emptyCart = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateCartData = (items) => ({
  cartItems: items,
  totalItems: items.reduce(
    (total, item) => total + item.quantity,
    0
  ),
  totalPrice: items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ),
});

const getGuestCartData = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    const items = storedCart ? JSON.parse(storedCart) : [];
    return calculateCartData(items);
  } catch (error) {
    console.error("Cart loading error:", error);
    return emptyCart;
  }
};

const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [cartData, setCartData] = useState(getGuestCartData);
  const [loading, setLoading] = useState(false);

  // Load cart from backend if authenticated
  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartData(getGuestCartData());
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCartData(response.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let cancelled = false;

    const refreshCart = async () => {
      await Promise.resolve();
      if (!cancelled) {
        await loadCart();
      }
    };

    refreshCart();

    return () => {
      cancelled = true;
    };
  }, [loadCart]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(cartData.cartItems));
    }
  }, [cartData.cartItems, isAuthenticated]);

  /* ADD TO CART */
  const addToCart = async (product) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const response = await cartAPI.addToCart({ productId: product.id });
        setCartData(response.data);
      } catch (error) {
        console.error("Failed to add to cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCartData((prev) => {
        const existingItem = prev.cartItems.find(
          (item) => item.id === product.id
        );
        let newCartItems;

        if (existingItem) {
          newCartItems = prev.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCartItems = [...prev.cartItems, { ...product, quantity: 1 }];
        }

        const totalItems = newCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const totalPrice = newCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        return { cartItems: newCartItems, totalItems, totalPrice };
      });
    }
  };

  /* REMOVE PRODUCT */
  const removeFromCart = async (id) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const response = await cartAPI.removeFromCart(id);
        setCartData(response.data);
      } catch (error) {
        console.error("Failed to remove from cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCartData((prev) => {
        const newCartItems = prev.cartItems.filter(
          (item) => item.id !== id
        );
        const totalItems = newCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const totalPrice = newCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return { cartItems: newCartItems, totalItems, totalPrice };
      });
    }
  };

  /* INCREASE QUANTITY */
  const increaseQty = async (id) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const item = cartData.cartItems.find((item) => item.id === id);
        if (item) {
          const response = await cartAPI.updateCartItem(
            id,
            item.quantity + 1
          );
          setCartData(response.data);
        }
      } catch (error) {
        console.error("Failed to update cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCartData((prev) => {
        const newCartItems = prev.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        const totalItems = newCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const totalPrice = newCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return { cartItems: newCartItems, totalItems, totalPrice };
      });
    }
  };

  /* DECREASE QUANTITY */
  const decreaseQty = async (id) => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const item = cartData.cartItems.find((item) => item.id === id);
        if (item && item.quantity > 1) {
          const response = await cartAPI.updateCartItem(
            id,
            item.quantity - 1
          );
          setCartData(response.data);
        }
      } catch (error) {
        console.error("Failed to update cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCartData((prev) => {
        const newCartItems = prev.cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        );
        const totalItems = newCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const totalPrice = newCartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return { cartItems: newCartItems, totalItems, totalPrice };
      });
    }
  };

  /* CLEAR CART */
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        setLoading(true);
        const response = await cartAPI.clearCart();
        setCartData(response.data);
      } catch (error) {
        console.error("Failed to clear cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCartData({ cartItems: [], totalItems: 0, totalPrice: 0 });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartData.cartItems,
        totalItems: cartData.totalItems,
        totalPrice: cartData.totalPrice,
        loading,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
