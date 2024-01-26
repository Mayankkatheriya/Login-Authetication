// ForgotPassword.js
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const context = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await context.resetPassword(emailRef.current.value);
      setMessage("Check your email for instructions to reset your password.");
    } catch (err) {
      console.error(err);
      setError(
        "Failed to reset password. Please check your email and try again."
      );
    }

    setLoading(false);
  }

  return (
    <div className="w-100 mt-5" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Go to <Link to="/login">Log In</Link> Page
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
