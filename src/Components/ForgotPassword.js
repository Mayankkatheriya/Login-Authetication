// Importing necessary dependencies and components
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

// Defining the ForgotPassword component
export default function ForgotPassword() {
  // Creating refs and state variables
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Accessing authentication context
  const context = useAuth();

  // Handling form submission for password reset
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);

      // Triggering password reset function from the authentication context
      await context.resetPassword(emailRef.current.value);

      // Displaying success message
      setMessage("Check your email for instructions to reset your password.");
    } catch (err) {
      console.error(err);
      // Displaying error message in case of failure
      setError(
        "Failed to reset password. Please check your email and try again."
      );
    }

    setLoading(false);
  }

  // Rendering the component UI
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
            {/* Link to navigate to the login page */}
            Go to <Link to="/login">Log In</Link> Page
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
