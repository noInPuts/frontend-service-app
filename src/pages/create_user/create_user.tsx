import { Form, Button } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { backendUrl } from '../../config/config'

export default function CreateUser() {

    const createAccount = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        
        const requestBody = {
            username : formData.get("username"),
            password : formData.get("password")
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch(`${backendUrl}:8086/api/user/create`, requestOptions)

    
        if (response.ok) {
            window.location.href = "/"
        } else {
           // TODO: 
           console.log("ERROR INPUT")
        }
    }

    return (
        <>
            <Container className="mt-4">
                <h1>Create user</h1>
                <Form onSubmit={createAccount}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control name="username" required type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control name="password" required type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Button className="mt-3" type="submit">
                        Create Account
                    </Button>
                </Form>
            </Container>
        </>
    )
}