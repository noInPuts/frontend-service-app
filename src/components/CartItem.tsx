import { Button } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";
import './cartItem.css';

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  quentity: number;
  restaurantId: number;
};

export function CartItem({ id, name, price, quentity, restaurantId }: CartItemProps) {
  const { increaseItemQuentity, decreaseItemQuentity } = useShoppingCart();
  return (
    <div className="row">
      <div className="col-sm-6">
        <p>Nr. {id} {name}</p>
        <p className="">{price * quentity} kr</p>
      </div>  
      <div className="col-sm-6 d-flex justify-content-end align-items-start gap-1 increase-decrease-buttons">
        <Button onClick={() => decreaseItemQuentity(id)}> - </Button>
        <span> {quentity} </span>
        <Button onClick={() => increaseItemQuentity(id, name, price, restaurantId)}> + </Button>
      </div>
    </div>
  );
}
