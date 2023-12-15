import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Button,
  TextField,
  Paper,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userNameError , setUserNameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError , setConfirmPasswordError] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateEmail = (email: string): boolean => {
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter, one number, and one special character.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateUsername = (username: string): boolean => {
    if (username.trim() === '') {
      setUserNameError("Username cannot be blank.");
      return false;
    }
    setUserNameError("");
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string): boolean => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Password does not match.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isUsernameValid = validateUsername(username);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword) 

    if (!isEmailValid || !isPasswordValid || !isUsernameValid || !isConfirmPasswordValid ) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });
      toast.success("User added successfully", { position: "bottom-right" });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data.message || "Error occurred");
      toast.error("Error! Something went wrong", { position: "bottom-right" })
    }
  };

  const handleShowPassword = () => {
    setShowPassword((currentShowState) => !currentShowState);
  };
  return (
    <Container component="main"   maxWidth="xs">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
 
      >
        <Grid item xs={12}>
          <Paper elevation={5} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography  variant="h5" align="center">
              Register
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{ marginTop: "20px" }}
              autoComplete="off"
            >
              <TextField
                variant="outlined"
                margin="normal"
                error={!!emailError}
                helperText={emailError}
                onBlur={() => validateEmail(email)}
                fullWidth
                label="Email"
                name="email"
                autoFocus
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                error={!!userNameError}
                helperText={userNameError}
                fullWidth
                label="Username"
                name="username"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                  }}
              />

              <TextField
                variant="outlined"
                margin="normal"
                error={!!passwordError}
                helperText={passwordError}
                onBlur={() => validatePassword(password)}
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value); 
                    if (confirmPassword.length > 0) {
                        validateConfirmPassword(confirmPassword);
                      }
                  }}
                InputProps={{
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge='end'>
                                {showPassword ? <VisibilityOff /> :  <Visibility /> }
                            </IconButton>
                        </InputAdornment>       
                    )
                }}
              />
              <TextField
        variant="outlined"
        margin="normal"
        error={!!confirmPasswordError}
        helperText={confirmPasswordError}
        fullWidth
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
            validateConfirmPassword(e.target.value);
           
          }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ margin: "20px 0" }}
              >
                Register
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </form>
            <Grid container justifyContent="center" style={{ marginTop: "16px" }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link
                    to="/login"
                    style={{ textDecoration: 'none' }}
                >
                         Login
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
