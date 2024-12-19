import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import bg from "../../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls";
import {
  countryValidation,
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
  userNameValidation,
} from "../Validators/Validators";
import axios from "axios";
import avatar from "../../../assets/avatar2.jpg";
import { ThreeDots } from "react-loader-spinner";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#3252DF",
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#eb5148",
      },
      grey: {
        100: "#F5F6F8",
      },
    },
  });

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const confirmPassword = watch("password");

  const [userImage, setUserImage] = useState(avatar);

  type RegisterData = {
    userName: string;
    phoneNumber: string;
    country: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    profileImage: string;
  };

  const appendRegisterFormData = (data: RegisterData) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("country", data.country);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };
  async function handleRegister(data: RegisterData) {
    // console.log(data);
    let registerDataForm = appendRegisterFormData(data);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/admin/users`,
        registerDataForm
      );
      // console.log(response);
      toast.success("Account Created Succefully");
      navigate("/Authentication");
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "Somthing went wrong!");
    }
    setIsLoading(false);

  }
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          {/* <CssBaseline /> */}

          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={6}
            component={Paper}
            elevation={6}
            square
            sx={{ height: "100vh" }}
            style={{ overflow: "auto" }}
            className="pageOverflow"
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  "& span": { color: "black", fontWeight: 400 },
                  "& h4": { color: "primary.main", fontWeight: 600 },
                }}
              >
                <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <h4>
                    Stay
                    <span>cation.</span>
                  </h4>
                </Link>
              </Typography>
            </Box>

            <Box
              sx={{
                my: 8,
                mx: 4,
              }}
            >
              <Container maxWidth="sm">
                <Box
                  sx={{
                    my: 3,
                  }}
                >
                  <Typography
                    fontWeight={600}
                    variant="h5"
                    sx={{
                      my: 4,
                    }}
                  >
                    Sign up
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ "& span": { color: "secondary.main" } }}
                  >
                    If you already have an account register <br /> You can{" "}
                    <Link
                      to={"/Authentication"}
                      style={{
                        textDecoration: "none",
                        fontWeight: 600,
                        marginLeft: 5,
                      }}
                    >
                      <span>Login here !</span>
                    </Link>
                  </Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit(handleRegister)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "100px", height: "100px", mb: 1 }}>
                      <img
                        src={userImage}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                    <Button
                      component="label"
                      role={undefined}
                      variant="outlined"
                      tabIndex={-1}
                      sx={{ mb: 2, color: "primary.main" }}
                    >
                      Upload image
                      <VisuallyHiddenInput
                        type="file"
                        {...register("profileImage", {
                          required: "Image is required",
                        })}
                        onChange={(e) =>
                          setUserImage(URL.createObjectURL(e?.target?.files[0]))
                        }
                      />
                    </Button>
                    {errors.profileImage && (
                      <Typography variant="body2" sx={{ color: "error.light" }}>
                        {errors?.profileImage?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <label htmlFor="userName" style={{ marginTop: "10px" }}>
                      User Name
                    </label>
                    <TextField
                      sx={{ bgcolor: "grey.100" }}
                      placeholder="Please type here ..."
                      margin="normal"
                      fullWidth
                      id="userName"
                      
                      // label="Email Address"
                      autoComplete="username"
                      autoFocus
                      {...register("userName", userNameValidation)}
                    />
                    {errors.username && (
                      <Typography variant="body2" sx={{ color: "error.light" }}>
                        {errors?.username?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <label htmlFor="phoneNumber" style={{ marginTop: "10px" }}>
                      Phone Number
                    </label>
                    <TextField
                      sx={{ bgcolor: "grey.100" }}
                      placeholder="Please type here ..."
                      margin="normal"
                      type="tel"
                      fullWidth
                      id="phoneNumber"
                      // label="Email Address"
                      autoComplete="phoneNumber"
                      {...register("phoneNumber", phoneNumberValidation)}
                    />
                    {errors.phoneNumber && (
                      <Typography variant="body2" sx={{ color: "error.light" }}>
                        {errors?.phoneNumber?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <label htmlFor="country" style={{ marginTop: "10px" }}>
                      Country
                    </label>
                    <TextField
                      sx={{ bgcolor: "grey.100" }}
                      placeholder="Please type here ..."
                      margin="normal"
                      fullWidth
                      id="country"
                      // label="Email Address"
                      autoComplete="country"
                      {...register("country", countryValidation)}
                    />
                    {errors.country && (
                      <Typography variant="body2" sx={{ color: "error.light" }}>
                        {errors?.country?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <label htmlFor="email" style={{ marginTop: "10px" }}>
                      Email Address
                    </label>
                    <TextField
                      sx={{ bgcolor: "grey.100" }}
                      placeholder="Please type here ..."
                      margin="normal"
                      type="email"
                      fullWidth
                      id="email"
                      // label="Email Address"
                      autoComplete="email"
                      {...register("email", emailValidation)}
                    />
                    {errors.email && (
                      <Typography variant="body2" sx={{ color: "error.light" }}>
                        {errors?.email?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <label htmlFor="password" style={{ marginTop: "10px" }}>
                      Password
                    </label>
                    <TextField
                      sx={{ bgcolor: "grey.100" }}
                      placeholder="Please type here ..."
                      margin="normal"
                      fullWidth
                      // label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      {...register("password", passwordValidation)}
                    />
                    {errors.password && (
                      <Typography variant="body2" sx={{ color: "error.light" }}>
                        {errors?.password?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <label
                      htmlFor="confirmPassword"
                      style={{ marginTop: "10px" }}
                    >
                      Confirm Password
                    </label>
                    <TextField
                      sx={{ bgcolor: "grey.100" }}
                      placeholder="Please type here ..."
                      margin="normal"
                      fullWidth
                      // label="Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value: string) =>
                          value === confirmPassword || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <Typography variant="body2" sx={{ color: "error.light" }}>
                        {errors?.confirmPassword?.message}
                      </Typography>
                    )}
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2, bgcolor: "primary", py: 2,height:"50px" }}
                    disabled={isLoading}
                  >
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
                                   "Sign up"
                                 )}
                  </Button>
                  {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2, bgcolor: "primary", py: 2 }}
                  >
                    Sign up
                  </Button> */}

                 
             
                </Box>
              </Container>
            </Box>
          </Grid>
          <Grid
            bgcolor={"white"}
            item
            // xs={false}
            sm={false}
            md={7}
            lg={6}
            sx={{
              height: "100vh",
              width: "100%",
              paddingY: 3,
              // bgcolor:'red'
            }}
          >
            <Container
              sx={{
                height: "95vh",
                width: "90%",
                backgroundImage: `url(${bg})`,
                backgroundRepeat: "no-repeat",
                borderRadius: "2%",
                bgcolor: "white",
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            ></Container>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
