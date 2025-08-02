import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import './ContactPage.css'; // CSS file ko yahan import karein

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('');

        // API call ko simulate karein
        setTimeout(() => {
            console.log('Form Submitted:', formData);
            setIsLoading(false);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => setStatus(''), 5000);
        }, 2000);
    };

    return (
        <main className="contact-section">
            <Container className={`contact-container ${isMounted ? 'mounted' : ''}`}>
                <Row className="g-0">
                    {/* Left Side: Contact Information */}
                    <Col lg={5}>
                        <div className="contact-info-wrapper h-100 d-flex flex-column justify-content-between">
                            <div>
                                <h2 className="fw-bold mb-3">Get in Touch</h2>
                                <p className="mb-5 opacity-75">Aapke paas koi sawal hai? Humse sampark karein.</p>

                                <div className="info-item d-flex align-items-start mb-4">
                                    <div className="icon d-flex align-items-center justify-content-center me-3"><i className="bi bi-geo-alt-fill"></i></div>
                                    <div>
                                        <h5 className="fw-semibold">Hamara Office</h5>
                                        <p className="mb-0 opacity-75">123 Innovation Drive, Tech City</p>
                                    </div>
                                </div>
                                <div className="info-item d-flex align-items-start mb-4">
                                    <div className="icon d-flex align-items-center justify-content-center me-3"><i className="bi bi-envelope-fill"></i></div>
                                    <div>
                                        <h5 className="fw-semibold">Humein Email Karein</h5>
                                        <p className="mb-0 opacity-75">support@quickdesk.app</p>
                                    </div>
                                </div>
                                <div className="info-item d-flex align-items-start mb-4">
                                    <div className="icon d-flex align-items-center justify-content-center me-3"><i className="bi bi-telephone-fill"></i></div>
                                    <div>
                                        <h5 className="fw-semibold">Humein Call Karein</h5>
                                        <p className="mb-0 opacity-75">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 pt-4 border-top border-light border-opacity-25">
                                <h5 className="fw-semibold mb-3">Follow Us</h5>
                                <div className="social-icons">
                                    <a href="#" className="me-3"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="me-3"><i className="bi bi-twitter-x"></i></a>
                                    <a href="#" className="me-3"><i className="bi bi-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side: Contact Form */}
                    <Col lg={7}>
                        <div className="contact-form-wrapper">
                            <h2 className="fw-bold text-dark mb-4">Message Bhejein</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3 mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Poora Naam</Form.Label>
                                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label>Vishay (Subject)</Form.Label>
                                    <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Regarding..." required />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formMessage">
                                    <Form.Label>Aapka Sandesh</Form.Label>
                                    <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Apna sandesh yahan likhein..." required />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        ) : (
                                            <><i className="bi bi-send-fill me-2"></i> Send Message</>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                            {status === 'success' && (
                                <Alert variant="success" className="mt-4">
                                    Aapka sandesh safaltapoorvak bhej diya gaya hai!
                                </Alert>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default ContactPage;
