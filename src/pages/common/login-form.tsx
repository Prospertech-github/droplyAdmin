import { ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogin from "@/mutations/auth/login";
import { Formik } from "formik";
import { object, string } from "yup";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import FormInput from "@/components/form-input";

const schema = object({
  email: string().email("Invalid email").required("Email is Required"),
  password: string().required("Password is Required"),
}).required();

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: login, error } = useLogin();
  const { state } = useLocation();

  const onSubmit = async (data: typeof initialValues) => {
    await login(data);

    navigate(
      state?.from && state.from !== "/login" ? state.from : "/dashboard",
      { replace: true }
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <FormInput
            name="email"
            label="email"
            type="email"
            className="h-[48px]"
            error={error?.response?.data?.email}
          />
          <FormInput
            name="password"
            label="password"
            type="password"
            className="h-[48px]"
            error={error?.response?.data?.password}
          />
          <div className="flex justify-between">
            {/* @ts-ignore */}
            <Checkbox
              label="Keep me signed in"
              name={"rememberMe"}
              value={values.rememberMe}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFieldValue("rememberMe", e.target.checked)
              }
            />
            <Link
              to="/forgot-password"
              className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
            >
              Forgot Password?{" "}
            </Link>
          </div>

          {/* @ts-ignore */}
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            text="Sign in"
            className="btn btn-dark block w-full text-center "
            loadingText="Signing in..."
          />
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
