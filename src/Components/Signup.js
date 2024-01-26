import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const context = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await context.signInWithGoogle();
    } catch (error) {
      console.error("Google Sign-In Error", error.message);
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
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
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                </Button>
              </div>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPasswordConfirm ? "text" : "password"}
                  ref={passwordConfirmRef}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordConfirmVisibility}
                >
                  {showPasswordConfirm ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                </Button>
              </div>
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
           <i class="fa-brands fa-google"></i> Sign Up with Google
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
