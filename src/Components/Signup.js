import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const context = useAuth();
  console.log(context);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const response = await context.signUp(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(response);
      context.setCurrentUser(response);
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate("/")
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await context.signInWithGoogle();
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Google Sign-In Error", error.message);
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate("/")
  };

  return (
    <div className="w-100 mt-5" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSumbit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
          <p className="py-1 text-center">Or</p>
          <Button
            disabled={loading}
            className="w-100"
            onClick={handleGoogleLogin}
          >
            Sign Up with Google
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default Signup;
