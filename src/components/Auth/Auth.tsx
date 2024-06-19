import React from "react";

import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Typography, message } from "antd";

import {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
} from "store/api/auth/auth-api";

import { queryStatuses } from "constants/general";

import { useGetAuthFields } from "hooks/auth/use-get-auth-fields";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getValidateMessage } from "utils/auth/get-validate-message";

import { IUser } from "types/IUser";

import AuthBgScreenImage from "assets/auth/auth-bg-screen-image.png";
import SignInAuthBgImage from "assets/auth/sign-in-bg-imag.png";
import SignUpAuthBgImage from "assets/auth/sign-up-bg-image.png";

import styles from "./Auth.module.scss";

export const Auth = () => {
  const [isHaveAnAccount, setIsHaveAnAccount] = React.useState(false);

  const { RegisterFields, LoginFields } = useGetAuthFields();

  const [
    signUp,
    {
      isSuccess: isSignUpSuccess,
      isLoading: isSignUpLoading,
      status: signUpStatus,
      error: signUpError,
    },
  ] = useSignUpMutation();

  const [
    signIn,
    {
      isSuccess: isSignInSuccess,
      isLoading: isSignInLoading,
      status: signInStatus,
      error: signInError,
    },
  ] = useSignInMutation();

  const [
    signOut,
    { isSuccess: isSignOutSuccess, isLoading: isSignOutLoading },
  ] = useSignOutMutation();

  const { authUser } = useGetAuthUser();

  console.log(authUser);

  const handleHaveAnAccount = () => {
    setIsHaveAnAccount(false);
  };

  const handleNotHaveAnAccount = () => {
    setIsHaveAnAccount(true);
  };

  const handleRegisterFinish = (formValues: IUser) => {
    signUp(formValues);
  };

  const handleRegisterFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  React.useEffect(() => {
    if (
      isSignUpSuccess &&
      !isSignUpLoading &&
      signUpStatus === queryStatuses.fulfilled
    ) {
      message.success("Вы зарегистрировались.");
    }

    if (
      !isSignUpSuccess &&
      !isSignUpLoading &&
      signUpStatus === queryStatuses.rejected
    ) {
      message.error(signUpError?.data?.message);
    }
  }, [isSignUpLoading, isSignUpSuccess, signUpStatus, signUpError]);

  const handleLoginFinish = (formValues: IUser) => {
    signIn(formValues);
  };

  const handleLoginFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  React.useEffect(() => {
    if (
      isSignInSuccess &&
      !isSignInLoading &&
      signInStatus === queryStatuses.fulfilled
    ) {
      message.success("Вы вошли в систему.");
    }

    if (
      !isSignInSuccess &&
      !isSignInLoading &&
      signInStatus === queryStatuses.rejected
    ) {
      message.error(signInError?.data?.message);
    }
  }, [isSignInLoading, isSignInSuccess, signInStatus, signInError]);

  return (
    <>
      <button onClick={() => signOut()}>fvvfg</button>

      <img
        className={styles.authBgScreenImage}
        src={AuthBgScreenImage}
        alt=""
      />

      <div className={styles.authScreen}>
        <div className={styles.authWrapper}>
          {isHaveAnAccount ? (
            <img
              className={styles.signUpAuthBgImage}
              src={SignUpAuthBgImage}
              alt=""
            />
          ) : (
            <img
              className={styles.signInAuthBgImage}
              src={SignInAuthBgImage}
              alt=""
            />
          )}

          <div className={styles.authFormWrapper}>
            <Typography.Title>
              {isHaveAnAccount ? "Sign up" : "Sign in"}
            </Typography.Title>

            {isHaveAnAccount ? (
              <Form
                layout="vertical"
                onFinish={handleRegisterFinish}
                onFinishFailed={handleRegisterFailed}
              >
                {RegisterFields}

                <Button htmlType="submit" type="primary" size="large">
                  Sign Up
                </Button>
              </Form>
            ) : (
              <Form
                layout="vertical"
                onFinish={handleLoginFinish}
                onFinishFailed={handleLoginFailed}
              >
                {LoginFields}

                <Button htmlType="submit" type="primary" size="large">
                  Sign In
                </Button>
              </Form>
            )}

            <div className={styles.goToLoginWrapper}>
              <Typography.Text>
                {isHaveAnAccount
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography.Text>{" "}
              {isHaveAnAccount ? (
                <Button
                  className={styles.goToLoginButton}
                  type="link"
                  onClick={handleHaveAnAccount}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  className={styles.goToRegisterButton}
                  type="link"
                  onClick={handleNotHaveAnAccount}
                >
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
