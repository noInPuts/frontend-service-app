import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useSearchParams } from "react-router-dom";
import { backendOrderURL } from "../../config/config";

export default function Order({isLoggedIn } : {isLoggedIn: Boolean}) {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("id");
    const [order, setOrder] = useState<order>();

    type order = {
        restaurantId: number,
        orderId: number,
        foodItems: any[]
    }

    
    useEffect(() => {
        getOrder()
    }, []);

    const getOrder = () => {
        const body = {"query":"query getOrder { getOrder(id: " + orderId +") }","operationName":"getOrder"}
            
            fetch(`${backendOrderURL}`, {
              credentials: 'include',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            })
            .then(response => {
              if (response.ok) {
                return response.json();
            } else {
               console.log("ERROR INPUT")
            }
            }).then((body: any) => {
                setOrder(JSON.parse(body.data.getOrder))
            })
    }

    const getBody = () => {
        if(isLoggedIn && orderId != null) {
            return <>
                <h1>Current Order: {orderId}</h1>
                {order?.foodItems.map((data, key) => {
                            return (<>
                                <div className="d-flex gap-5 border">    
                                    <p>{data.id}.</p>
                                    <p>{data.name}</p>
                                    <p>quantity: {data.quantity}</p>
                                    <p>{data.price} DKK</p>
                                </div>
                                </>
                                )
                })}
            </>
        } else {
            return <>
                <h1>Unauthorized access!</h1>
            </>
        }
    }

    return (<>
    <Container>
        {getBody()}
    </Container>
    </>)
}