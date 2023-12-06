import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RestaurantMenu(props: any) {
    const [searchParams, setSearchParams] = useSearchParams();
    const resturantId = searchParams.get("id");
    console.log(resturantId);
    const [FoodItem, setFoodItems] = useState<any[]>([]);
    useEffect(() => {

        FoodItems()

    }, []);

    const FoodItems = () => {
        fetch("http://localhost:8083/restaurants/" + resturantId)
            .then((response) => response.json())
            .then((text) => setFoodItems(text.menu))
            .catch((error) => console.error('Fetch error:', error));


    }

    useEffect(() => {

        console.log(FoodItem);

    }, [FoodItem]);

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row content">
                        


                        {FoodItem.map((data, key) => {
                            return (
                                <div className="col-sm-8 text-left" key={data.id}>
                                    <h1>nr {data.id} {data.name}</h1>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <p>{data.price} kr</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <Button>add to cart</Button>

                                        </div>
                                    </div><hr></hr>

                                </div>)
                        })}
                    </div>
                </div>
            </Container >
        </>
    );
}