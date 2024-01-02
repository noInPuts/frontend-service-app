import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
    isOpen: boolean;

}

export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Order Overview</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {
              cartItems.reduce((total, cartItem) => {
                const item = cartItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quentity
              }, 0)
            } kr
          </div>
          <a href="/create_order" className="btn btn-primary"> Pay </a>
        </Stack>
            </Offcanvas.Body>
        </Offcanvas>

    )
}