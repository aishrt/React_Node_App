import { ContentLayout } from "../../layout/ContentLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { marksDetails, submitMarks } from "../api/submitMarks";
import login from "../../assets/marks.jpg";
import { Button, TextField } from "@mui/material";
import "./protected.css";
import { getMarks } from "../api/getMarks";
import { useEffect, useState } from "react";

interface MarksData {
  maths?: string;
  science?: string;
  sst?: string;
  hindi?: string;
  english?: string;
}

export const AddMarks = () => {
  const { id } = useParams();

  const [isLoading, setloading] = useState<boolean>(false);
  const [marksData, setmarksData] = useState<MarksData>({});
  const getMarksData = async () => {
    setloading(true);
    const data = await getMarks(id ? id : "");
    setmarksData(data?.data?.data);
    setloading(false);
  };

  console.log(marksData);
  const hell = marksData?.maths;
  console.log(hell);

  useEffect(() => {
    if (id) {
      getMarksData();
    }
  }, [id]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<marksDetails>();
  const onSubmit: SubmitHandler<marksDetails> = async (data) => {
    try {
      const response = await submitMarks({ ...data, userId: id ? id : "" });
      const responsemsg = response?.data?.message;
      toast.success(responsemsg);
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
    <>
      {isLoading ? (
        <p>Laod</p>
      ) : (
        <ContentLayout title="Add Marsk">
          {Object.keys(marksData).length > 0 && (
            <div className="formDiv">
              <div className="formBorder loginMargin">
                <div className="row">
                  <div className="col-md-7">
                    <div className="imgDiv">
                      <img className="markImg" src={login} alt="login" />
                    </div>
                  </div>
                  <div className="col-md-5 make-center">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="maths"
                        label="Maths"
                        type="number"
                        variant="filled"
                        {...register("maths", {
                          required: "Marks is required",
                          maxLength: {
                            value: 2,
                            message: "Marks must be less than 99 digit",
                          },
                        })}
                        defaultValue={marksData?.maths}
                      />
                      {errors.maths && (
                        <p className="errorText">{errors.maths.message}</p>
                      )}
                      <TextField
                        id="science"
                        label="Science"
                        type="number"
                        variant="filled"
                        {...register("science", {
                          required: "Marks is required",
                          maxLength: {
                            value: 2,
                            message: "Marks must be less than 99 digit",
                          },
                        })}
                        defaultValue={marksData?.science}
                      />
                      {errors.science && (
                        <p className="errorText">{errors.science.message}</p>
                      )}

                      <TextField
                        id="sst"
                        label="SST"
                        type="number"
                        variant="filled"
                        {...register("sst", {
                          required: "Marks is required",
                          maxLength: {
                            value: 2,
                            message: "Marks must be less than 99 digit",
                          },
                        })}
                        defaultValue={marksData?.sst}
                      />
                      {errors.sst && (
                        <p className="errorText">{errors.sst.message}</p>
                      )}

                      <TextField
                        id="hindi"
                        label="Hindi"
                        type="number"
                        variant="filled"
                        {...register("hindi", {
                          required: "Marks is required",
                          maxLength: {
                            value: 2,
                            message: "Marks must be less than 99 digit",
                          },
                        })}
                        defaultValue={marksData?.hindi}
                      />
                      {errors.hindi && (
                        <p className="errorText">{errors.hindi.message}</p>
                      )}

                      <TextField
                        id="english"
                        label="English"
                        type="number"
                        variant="filled"
                        {...register("english", {
                          required: "Marks is required",
                          maxLength: {
                            value: 2,
                            message: "Marks must be less than 99 digit",
                          },
                        })}
                        defaultValue={marksData?.english}
                      />
                      {errors.english && (
                        <p className="errorText">{errors.english.message}</p>
                      )}

                      <div className="make-center">
                        <Button
                          className={"mt-4"}
                          variant="contained"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ContentLayout>
      )}
    </>
  );
};
