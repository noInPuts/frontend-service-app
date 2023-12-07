import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";

type ShoppingCartProps = {
    isOpen: boolean;

}

export function ShoppingCart({isOpen}: ShoppingCartProps){
const closeCart = useShoppingCart();
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h1>Shopping Cart</h1>
            </Offcanvas.Body>
        </Offcanvas>

    )
}