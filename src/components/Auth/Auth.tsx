import React from "react";

import { Button, Form, Typography } from "antd";

import { useGetAuthFields } from "hooks/auth/use-get-auth-fields";

import AuthBgScreenImage from "assets/auth/auth-bg-screen-image.png";
import SignInAuthBgImage from "assets/auth/sign-in-bg-imag.png";
import SignUpAuthBgImage from "assets/auth/sign-up-bg-image.png";

import styles from "./Auth.module.scss";

export const Auth = () => {
  const [isHaveAnAccount, setIsHaveAnAccount] = React.useState(false);

  const { RegisterFields, LoginFields } = useGetAuthFields();

  const handleHaveAnAccount = () => {
    setIsHaveAnAccount(false);
  };

  const handleNotHaveAnAccount = () => {
    setIsHaveAnAccount(true);
  };

  return (
    <>
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
              <Form layout="vertical">
                {RegisterFields}

                <Button htmlType="submit" type="primary" size="large">
                  Sign Up
                </Button>
              </Form>
            ) : (
              <Form layout="vertical">
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
                  className={styles.goToLoginButton}
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
