import { Button } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";

type CartItemProps = {
    id: number;
    name: string;
    price: number;
    quentity: number;
}

export function CartItem({id, name, price, quentity}: CartItemProps) {
    const {increaseItemQuentity, decreaseItemQuentity} = useShoppingCart();
    return (
        <div className="row">
            <div className="col-sm-8">
                <p> nr {id} {name}</p>
                <p>{price} kr</p>
                <div>
          {" "}
          {quentity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quentity}
            </span>
            
          )}
        </div>        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {price * quentity} kr
        </div>
            </div>
            <div className="col-sm-2">
                <div className="d-flex align-items-center flex-column">
                    <Button onClick={()=> decreaseItemQuentity(id)}> - </Button>
                    <div> <span>{quentity}</span> in cart</div>
                    <Button onClick={()=> increaseItemQuentity(id, name, price)}> + </Button>
                </div>
            </div>
        </div>
    )
}