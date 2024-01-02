import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Button } from "@mui/material";
import contactImg from "../../assets/contact.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentLayout } from "../../layout/ContentLayout";
import { API_URL } from "../../config";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

interface FormData {
  email: string;
  name: string;
  phone_number: string;
  text: string;
}

export const ContactUs = () => {
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px; 
    color: grey;
    background: #e9e8e8;
    border: 1px solid #e9e8e8 
  `
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/contactEmail`, data);
      console.log(response, "email response");
      toast.success(`Thankyou for contacting`);
    } catch (error: any) {
      toast.error(`${error?.response?.data?.message}`);
    }
  };

  return (
    <ContentLayout title="Contact Us">
      <div className="formDiv">
        <div className="">
          <div className="row">
            <div className="col-md-6 make-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="first_name"
                    {...register("name", { required: true })}
                    label="Name"
                    variant="filled"
                  />

                  {errors.name && (
                    <p className="errorText">Name is required.</p>
                  )}
                </div>

                <div>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    {...register("email", {
                      required: "Email is required",
                      maxLength: {
                        value: 60,
                        message: "Email cannot exceed 60 characters",
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
                </div>

                <div>
                  <TextField
                    id="phone_number"
                    label="Phone Number"
                    type="number"
                    variant="filled"
                    {...register("phone_number", {
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Valid phone number is required",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number cannot exceed 10 digits",
                      },
                    })}
                  />
                  {errors.phone_number && (
                    <p className="errorText">{errors.phone_number.message}</p>
                  )}
                </div>

                <div className="mt-3">
                  <Textarea
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="Message"
                    {...register("text", { required: true })}
                  />

                  {errors.text && (
                    <p className="errorText">Message is required.</p>
                  )}
                </div>

                <div className="make-center">
                  <Button
                    className={clsx("mt-4")}
                    variant="contained"
                    type="submit"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
            <div className="col-md-6 make-center">
              <div className="imgDiv">
                <img src={contactImg} alt="register" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
