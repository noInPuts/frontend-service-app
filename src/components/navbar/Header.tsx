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

export default function Header({ isLoggedIn } : { isLoggedIn : Boolean }) {
    
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
                    <Nav.Link className="nav-account">My Account</Nav.Link>
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
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="username" type="text" placeholder="Enter username" className={badLoginAttempt ? 'error-outline' : ''} required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Enter password" className={badLoginAttempt ? 'error-outline' : ''}  required/>
                                </Form.Group>
                                <Button variant="primary" type="submit" name="signInButton">
                                    Sign in
                                </Button>
                                <p id='sign-up'>Don't have a user? <a href="/create_user">Sign up here!</a></p>
                            </Form>
                        </Popover.Body>
                    </Popover>
                }
            >
                <Nav.Link className="nav-account">Sign in</Nav.Link>
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
                            {/* 
                            {['bottom'].map((placement) => (
                                <OverlayTrigger
                                    trigger="click"
                                    key={placement}
                                    placement={'bottom'}
                                    overlay={
                                        <Popover id={`popover-positioned-${placement}`}>
                                            <Popover.Header as="h3">{`cart`}</Popover.Header>
                                            <Popover.Body>
                                                <div className="col-md-4">
                                                    <div className="card mb-4">

                                                        <div className="card-body">
                                                            <ul className="list-group list-group-flush">
                                                                <li
                                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                                    Products
                                                                    <span>$53.98</span>
                                                                </li>
                                                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                                    Shipping
                                                                    <span>Gratis</span>
                                                                </li>
                                                                <li
                                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                                    <div>
                                                                        <strong>Total amount</strong>
                                                                        <strong>
                                                                            <p className="mb-0">(including VAT)</p>
                                                                        </strong>
                                                                    </div>
                                                                    <span><strong>$53.98</strong></span>
                                                                </li>
                                                            </ul>

                                                            <button type="button" className="btn btn-primary btn-lg btn-block">
                                                                Go to checkout
                                                            </button></div></div></div>
                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <Button variant="secondary">cart <Badge pill bg="danger">9</Badge></Button>
                                </OverlayTrigger>
                            ))} */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

