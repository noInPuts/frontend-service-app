import Container from "react-bootstrap/Container"
import Badge from "react-bootstrap/Badge"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendResturant } from "../config/configResturant";

export default function FrontPage() {
    /*useEffect(() => {
        console.log("fetching data");
        console.log(backendResturant);
        fetch("http://localhost:8083/restaurants")
        .then((response) => response.json())
        .then((text) => console.log(text)) 
        .catch((error) => console.error('Fetch error:', error));
     });*/

    const [Resturant, setResturants] = useState<any[]>([]);
    useEffect(() => {
        Resturants()
    }, []);

    const Resturants = async () => {
        const response = await fetch(`${backendResturant}restaurants`);

        setResturants(await response.json())
    }

    return (
        <>
            <Container>
                <h1>Restaurants</h1>


                {Resturant.map(data => {
                    return (
                        <div key={data.id}>
                            <Link to={`/Resturant_menu?id=${data.id}`}>
                                <div className="col-sm-8 text-left">
                                    <h1>{data.name}</h1>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <p>{data.address}</p>
                                            <br></br>
                                        </div>
                                        <div className="col-sm-2">
                                            <h2><Badge pill bg="success">open</Badge></h2> <br></br>
                                            <p>opening hours</p>

                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>




                            </Link> </div>)
                })}
            </Container >
        </>
    );
}