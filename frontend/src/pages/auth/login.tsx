import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import "./auth.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import login from "../../assets/login.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "../../utils/storage";
import { ContentLayout } from "../../layout/ContentLayout";
import { loginApi, loginDetails } from "../api/auth/loginApi";
// import { useContext } from "react";
// import { MyContext } from "../../context/MyContextProvider";
import { useMyStore } from "../../zustand/useZustand";

export const Login = () => {
  // const myContext = useContext(MyContext);
  const { setTokenValue } = useMyStore();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginDetails>();

  const onSubmit: SubmitHandler<loginDetails> = async (data) => {
    try {
      const response = await loginApi(data);
      const responsemsg = response?.data?.message;
      toast.success(responsemsg);
      const accessTocken = response?.data?.data?.tokens?.access?.token;

      storage.setToken(`${accessTocken}`);
      // myContext?.setTokenValue(`${accessTocken}`);
      setTokenValue(`${accessTocken}`);

      navigate("/profile");
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <ContentLayout title="Login">
      <div className="formDiv">
        <div className="formBorder loginMargin">
          <div className="row">
            <div className="col-md-7">
              <div className="imgDiv">
                <img src={login} alt="login" />
              </div>
            </div>
            <div className="col-md-5 make-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="filled"
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 1,
                      message: "Email is required",
                    },
                    maxLength: {
                      value: 60,
                      message: "Email must be less than 60 characters",
                    },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="errorText">{errors.email.message}</p>
                )}
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  {...register("password", {
                    required: "Password is required",
                    maxLength: {
                      value: 99,
                      message: "Password must be less than 99 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="errorText">{errors.password.message}</p>
                )}

                <div className="make-center">
                  <Button
                    className={clsx("mt-4")}
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="make-center mt-2">
          Dont have an account{" "}
          <span className="registerSpan" onClick={() => navigate("/register")}>
            Register here!
          </span>
        </div>
      </div>
    </ContentLayout>
  );
};
