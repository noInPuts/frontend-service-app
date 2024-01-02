import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FoodItemMenu } from "../components/FoodItemMenu";
import { backendResturant } from "../config/configResturant";

export default function RestaurantMenu(props: any) {
    const [searchParams] = useSearchParams();
    const resturantId = searchParams.get("id");
    const [FoodItem, setFoodItems] = useState<any[]>([]);

    useEffect(() => {
        FoodItems()
    }, []);

    const FoodItems = () => {
        fetch(`${backendResturant}restaurants/` + resturantId)
            .then((response) => response.json())
            .then((text) => setFoodItems(text.menu))
            .catch((error) => console.error('Fetch error:', error));
    }

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row content">
                        
                        {FoodItem.map((data, key) => {
                            return (
                                <FoodItemMenu {... data} restaurantId={resturantId}></FoodItemMenu>
)
                        })}
                    </div>
                </div>
            </Container >
        </>
    );
}