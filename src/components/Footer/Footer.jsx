import './Footer.css';
import footerImg from '../../assets/mm-footer.svg';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer border-top py-5 mt-5'>
            <Container>
                <Row className='footer-content gy-4 align-items-center'>

                    <Col xs={12} md={6} className='footer-left text-center text-md-start'>
                        <img className='footer-logo mb-2' src={footerImg} alt="money-mentor-logo" />
                        <p className="text-muted mb-0">Smart tracking for smarter savings.</p>
                    </Col>
            
                    <Col xs={12} md={6} className='footer-right'>
                        <Stack gap={3} className='align-items-center align-items-md-end'>
                            <div className='footer-links d-flex gap-3'>
                                <a href="https://github.com/angelikakasia/money-mentor-front-end" target="_blank">GitHub</a>
                                <Link to="/about">About</Link>
                                <Link to="/privacy">Privacy</Link>
                                <Link to="/contact">Support</Link>
                            </div>

                        <div className='footer-devs text-center text-md-end'>
                            <p className="mb-1 text-muted small">&copy; {currentYear} Money Mentor. All rights reserved.</p>
                            <p className="mb-1 text-muted small">Made with 💚 by Gabriel, Angelika & Sarah.</p>
                        </div>
                    </Stack>                
                </Col>

            </Row>
        </Container>
        </footer>
    );
};

export default Footer;