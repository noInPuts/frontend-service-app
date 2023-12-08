import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Form from 'react-bootstrap/Form';
import './Header.css';
import { backendUrl } from '../../config/config'
import { useState } from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../ShoppingCartContext';
import { CartItem } from '../CartItem';

export default function Header({ isLoggedIn } : { isLoggedIn : Boolean }) {

    const { openCart, cartQuantity } = useShoppingCart()
    const [badLoginAttempt, setBadLoginAttempt] = useState<Boolean>(false);

    const logout = async () => {
        try {
            const response = await fetch(`${backendUrl}user/logout`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include",
            });
      
            if (response.ok) {
              window.location.reload()
            } 
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const GetNavbarBasedByLogin = () => {
        if(isLoggedIn) {
            return <>{['bottom'].map((placement) => (
                <OverlayTrigger
                    trigger="click"
                    key={placement}
                    placement={'bottom'}
                    overlay={
                        <Popover id={`popover-positioned-${placement}`}>
                            <Popover.Body>
                                <Button onClick={logout} className='bg-danger'>Log out</Button>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Nav.Link className="nav-account" id='MyAccountButton'>My Account</Nav.Link>
                </OverlayTrigger>
            ))}</>;
        }
        return <>{['bottom'].map((placement) => (
            <OverlayTrigger
                trigger="click"
                key={placement}
                placement={'bottom'}
                overlay={
                    <Popover id={`popover-positioned-${placement}`}>
                        <Popover.Header as="h3">{`Sign in`}</Popover.Header>
                        <Popover.Body id="sign-in-popup-body">
                            <Form onSubmit={login}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="username" type="text" placeholder="Enter username" className={badLoginAttempt ? 'error-outline' : ''} required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Enter password" className={badLoginAttempt ? 'error-outline' : ''}  required/>
                                </Form.Group>
                                <Button variant="primary" type="submit" name="signInButton" id='signInButton'>
                                    Sign in
                                </Button>
                                <p id='sign-up'>Don't have a user? <a href="/create_user">Sign up here!</a></p>
                            </Form>
                        </Popover.Body>
                    </Popover>
                }
            >
                <Nav.Link className="nav-account" id='signInPopOver'>Sign in</Nav.Link>
            </OverlayTrigger>
        ))}</>;
    }

    const login = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget);
        
        const requestBody = {
            username : formData.get("username"),
            password : formData.get("password")
        }

        try {
            const response = await fetch(`${backendUrl}user/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: "include",
              body: JSON.stringify(requestBody),
            });
      
            if (response.ok) {
                const headers = response.headers;
                const cookies = headers.get('set-cookie');
                if (cookies) {
                  console.log('Cookies found in the response:', cookies);
                  // You can process or manipulate the cookies here
                } else {
                  console.log('No cookies found in the response.');
                }
            
              //const data = await response.json();
              window.location.reload()
            } else {
                setBadLoginAttempt(true)
                alert("Wrong credentials!")
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <>
            <div className="jumbotron" id='header-banner'>
                <div className="container text-center">
                    <h1>MTOGO</h1>
                </div>
            </div>
            <Navbar expand="lg" bg="success" data-bs-theme="dark" className="navbar">
                <Container>
                    <Navbar.Brand href="/">MTOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="menu-navbar" />
                    <Navbar.Collapse id="menu-navbar">
                        <Nav className="me-auto">
                            <Nav.Link href="#">Pizza</Nav.Link>
                            <Nav.Link href="#">Burger</Nav.Link>
                            <Nav.Link href="#">Sushi</Nav.Link>
                        </Nav>
                       
                        <Nav className='ms-auto'>
                            <GetNavbarBasedByLogin />
                            {cartQuantity > 0 && (    
          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
  )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

