import { Button, Container } from "react-bootstrap";
import { useShoppingCart } from "../../components/ShoppingCartContext";
import { CartItem } from "../../components/CartItem";
import { backendOrderURL } from "../../config/config";

export default function CreateOrderPage({ isLoggedIn } : { isLoggedIn : Boolean }) {
    
    const { cartItems, emptyCart } = useShoppingCart()

    const pay = async () => {
        if(isLoggedIn && cartItems.at(0) != null) {
            const body = {"query":"mutation MyMutation {\n  createOrder(order: {restaurantId: \""+ cartItems.at(0)?.restaurantId +"\", foodItems: ["+cartItems.map(item => `{quantity: ${item.quentity}, id: ${item.id}},`)+"]})\n}","operationName":"MyMutation"}
            
            fetch(`${backendOrderURL}`, {
              credentials: 'include',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            })
            .then(response => {
              if (response.ok) {
                emptyCart();
                return response.json();
            } else {
               console.log("ERROR INPUT")
            }
            }).then((body: any) => {
              
              const order = JSON.parse(body.data.createOrder);
              window.location.href = "/order?id=" + order.restaurantId;
            })
            
        } else {
            alert("You are required to be logged in")
        }
    }
    
    return (<>
        <Container className="mt-4">
            <h1>Order Overview</h1>
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
          <Button onClick={pay}> Pay </Button>
        </Container>
    </>);
}