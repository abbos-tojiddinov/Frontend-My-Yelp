import { Box, Button, Container, Grid, Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase/config';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const confirmPass = () => confirmPassword === password;

  const submitForm = (e) => {
    e.preventDefault();
    const confirm = confirmPass();
    if (confirm) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          db.collection("users").add({
            userName: userName,
            email: email,
          }) 
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        })
        .catch((error) => {
          setErrorMsg(error.message);
          console.error("Error signing up: ", error);
        });
    } else {
      setShowConfirmMessage(true);
    }
  };

  return (
    <Box sx={{ background: "#0000", height: "100vh" }}>
      <Container>
        <Stack direction="row" justifyContent="center" mt={10}>
          <Stack
            width="500px"
            sx={{
              background: 'transparent',
              p: "10px 20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px cyan",
            }}
          >
            <Box mb={7}>
              <Typography textAlign="center" fontWeight="bold" fontSize="25px">
                Sign up for Yelp
              </Typography>
              <Typography textAlign="center" fontSize={15}>
                Sign up to continue to our platform.
              </Typography>
            </Box>
            <form onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {showConfirmMessage && <Typography fontSize={14} color='red'>Please Confirm your password</Typography>}
                </Grid>
              </Grid>
              {errorMsg && <Typography color='red' fontSize={14}>{errorMsg}</Typography>}
              <Typography mb={3} textAlign="center">
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
              <Stack direction="row" justifyContent="center">
                <Button type="submit" variant="contained" sx={{ width: "250px" }}>
                  Sign up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
