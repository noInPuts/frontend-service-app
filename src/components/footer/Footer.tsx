import { Col, Container, Row } from "react-bootstrap"
import "./Footer.css"

export default function Footer() {
    return <div id="footer" className="pt-4 pb-4">
        <Container>    
            <Row>
                <Col>
                    <h6>Apply for partner</h6>
                    <ul>
                        <li><a href="#">Apply as a restaurant</a></li>
                    </ul>
                </Col>
            </Row>
        </Container>
    </div>
}