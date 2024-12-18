import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CONSTANTS } from "../common/constants/constants";
import { useSingUp } from "../common/services/useAuth";
import { URLS } from "../common/constants/urls";
import Loader from "../components/common/Loader";
import { useEffect } from "react";

const Register = () => {
  const { mutate, data, isPending } = useSingUp(URLS.REGISTER);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors, dirtyFields },
    handleSubmit,
    trigger,
    control,
  } = methods;

  const onSubmit = (data: any) => {
    mutate(data);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {isPending && <Loader />}
      <div className="container">
        <div className="">
          <h1>
            <span className="text-pc-1">Register new user</span>
            <br />
            ToDo account.
          </h1>
          {/* <p className="mt-10">Manage your tasks.</p> */}
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="justify-content-md-center">
              <Col lg="6">
                <Form.Group className="form-group my-40">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Controller
                    name="name"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      pattern: {
                        value: CONSTANTS.ONLY_BLANK_SPACES_NOT_ALLOWED_REGEX,
                        message: "Invalid name format",
                      },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        onChange={(e: any) => {
                          onChange(e.target.value);
                          trigger("name");
                        }}
                        onBlur={() => onBlur()}
                        type="text"
                        placeholder=""
                        id="name"
                        isValid={!errors.name && dirtyFields.name}
                        isInvalid={!!errors.name}
                        value={value}
                      />
                    )}
                  />
                  {errors?.name?.message && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.name?.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="form-group my-40">
                  <Form.Label htmlFor="cidn">Email Address</Form.Label>
                  <Controller
                    name="email"
                    defaultValue=""
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      pattern: {
                        value: CONSTANTS.EMAIL_REGEX,
                        message: "Invalid email format",
                      },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        onChange={(e: any) => {
                          onChange(e.target.value);
                          trigger("email");
                        }}
                        onBlur={() => onBlur()}
                        type="text"
                        placeholder=""
                        id="cidn"
                        isValid={!errors.email && dirtyFields.email}
                        isInvalid={!!errors.email}
                        value={value}
                      />
                    )}
                  />
                  {errors?.email?.message && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.email?.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="form-group my-40">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Mininum length of password is 6 character",
                      },
                      maxLength: {
                        value: 50,
                        message: "Maximum length of password is 50 character",
                      },
                      pattern: {
                        value: CONSTANTS.PASSWORD_VALIDATION_REGEX,
                        message:
                          "Password must have one uppercase , a lowercase and a special character",
                      },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Form.Control
                        onChange={(e: any) => {
                          onChange(e.target.value);
                          trigger("password");
                        }}
                        onBlur={() => onBlur()}
                        value={value}
                        type="password"
                        placeholder=""
                        id="password"
                        isValid={!errors.password && dirtyFields.password}
                        isInvalid={!!errors.password}
                      />
                    )}
                  />
                  {errors?.password?.message && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.password?.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center my-30">
              <Col lg="6">
                <div className="d-flex align-items-center justify-content-center gap-12 mb-30">
                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Register;
