import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls";
import loginImage from "../../../assets/login.png";
import { emailValidation } from "../Validators/Validators";
import styles from "./Login.module.css";
import { ThreeDots } from "react-loader-spinner";


export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();  

  async function callLoginApi(data: { email: string }) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseUrl}/admin/users/login`,data
        
      );
      toast.success(response.data.message);
      localStorage.setItem("adminToken",response?.data?.data?.token); 
      // saveLoginData(); 
      const encodedToken:any=localStorage.getItem("adminToken");
    const decodedToken:any=jwtDecode(encodedToken); 
    let role=decodedToken?.role;
    localStorage.setItem('loginData',JSON.stringify(decodedToken)); 
    localStorage.setItem('userRole',JSON.stringify(decodedToken?.role)); 

      if(role=='user'){
        navigate("/");
      }
      else{
        navigate("/Admin");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = (data: { email: string }) => {
    callLoginApi(data);
  };

  return (
   <>
    <Container
      maxWidth={"xl"}
      sx={{
        marginY: 0,
        paddingY: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "100%",
        minHeight: "100vh",
      }}
    >
        
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: "space-around",
          alignItems: { xs: "center", lg: "start" }

        }}
      >
          
        <Grid item xs={12} sm={8} md={5}>
        <Link to={"/"} className="logo"  style={{ "color" : "#3252df" ,"fontSize":"1.5rem" ,"textDecoration":"none" ,"fontWeight":600}}>
            Stay
            <Typography component="span" variant="h5" sx={{ color: "#152c5b" }}>
              cation.
            </Typography>
          </Link>
          <Box
           
            sx={{
              marginTop:5,
              paddingY: 5,
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              // marginLeft:"60px"
            }}
          >
      
            <Box mb={4}>
              <Typography fontWeight={600} mb={3} variant="h5">
              Sign in
              </Typography>
              <Typography variant="body1">
              If you don’t have an account register <br /> You can{" "}
                <Link
                  to={"/Authentication/register"}
                  style={{
                    color: "#eb5148",
                    textDecoration: "none",
                    fontWeight: 600,
                    marginLeft: 5,
                  }}
                >
                  
                  Register here !
                </Link>
              </Typography>
            </Box>

            <Box
             component="form"
             onSubmit={handleSubmit(onSubmit)}
              sx={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
                    <Box sx={{ display: "flex", flexDirection: "column" ,height:100 }}>
                <label htmlFor="email" style={{ fontSize: "1.3rem", fontWeight: 500, opacity: 0.8 }}>Email</label>
                <TextField
                  sx={{ marginTop: 1, marginBottom: 1, bgcolor: "#f5f6f8" }}
                  type="email"
                  id="email"
                  placeholder="Please type here ..."
                  {...register("email", emailValidation)}
                />
                {errors.email && (
                  <Typography variant="body2" sx={{ color: "error.light" }}>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>


              <Box sx={{ display: "flex", flexDirection: "column" ,height:100, mt:3 }}>
                <label htmlFor="password" style={{ fontSize: "1.3rem", fontWeight: 500, opacity: 0.8 }}>Password</label>
                <TextField
                  sx={{ marginTop: 1, marginBottom: 1, bgcolor: "#f5f6f8" }}
                  type="password"
                  id="password"
                  placeholder="Please type here ..."
                  {...register("password",{required:"Password is required"}
                  //  passwordValidation
                  )}
                />
                {errors.password && (
                  <Typography variant="body2" sx={{ color: "error.light" }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{textAlign:'end',mt:1}}>
              <Link to={'forgot-password'} style={{
                    color: "#4D4D4D",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}>
              Forgot Password ?
              </Link>
              </Box>

              <Button disabled={isLoading}                     sx={{ mt: 5, mb: 2, bgcolor: "#3252DF", py: 2,height:"50px" }}
   type="submit" variant="contained" >
                {isLoading ? (
                  
 <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#1966d2"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />  
              
                ) : (
                  "Login"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={6}>
          <Box>
            <img
              width={"100%"}
              src={loginImage}
              alt="loginImage"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
   </>
  )
}
