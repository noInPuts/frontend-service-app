import { Button } from "react-bootstrap";
import { useShoppingCart } from "./ShoppingCartContext";

type FoodItemProps = {
    id: number;
    name: string;
    price: number;
    restaurantId: number;
}

export function FoodItemMenu({id, name, price, restaurantId}: FoodItemProps) {
    const {getItemQuentity, increaseItemQuentity, decreaseItemQuentity} = useShoppingCart();
    const quantity = getItemQuentity(id); 
    return (
    <div className="col-sm-8 text-left" key={id}>
                                    <h1>nr {id} {name}</h1>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <p>{price} kr</p>
                                        </div>
                                        <div className="col-sm-2">
                                            {quantity === 0 ? (<Button onClick={()=> increaseItemQuentity(id, name, price, restaurantId)}>add to cart</Button>) : 
                                            <div className="d-flex align-items-center flex-column">
                                               <Button onClick={()=> decreaseItemQuentity(id)}> - </Button>
                                               <div> <span>{quantity}</span> in cart</div>
                                               <Button onClick={()=> increaseItemQuentity(id, name, price, restaurantId)}> + </Button>
                                                </div>}
                                        </div>
                                    </div><hr></hr>
                                </div>
)}