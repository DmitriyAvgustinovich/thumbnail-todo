import React from "react";

import { Button, Typography } from "antd";

import AuthBgScreenImage from "assets/auth/auth-bg-screen-image.png";
import SignInAuthBgImage from "assets/auth/sign-in-bg-imag.png";
import SignUpAuthBgImage from "assets/auth/sign-up-bg-image.png";

import styles from "./Auth.module.scss";
import { AuthLogin } from "./AuthLogin/AuthLogin";
import { AuthRegister } from "./AuthRegister/AuthRegister";

export const Auth = () => {
  const [isHaveAnAccount, setIsHaveAnAccount] = React.useState(false);

  const handleHaveAnAccount = () => {
    setIsHaveAnAccount(false);
  };

  const handleNotHaveAnAccount = () => {
    setIsHaveAnAccount(true);
  };

  const isHaveAnAccountText = isHaveAnAccount
    ? "Already have an account?"
    : "Don't have an account?";

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

            {isHaveAnAccount ? <AuthRegister /> : <AuthLogin />}

            <div className={styles.goToLoginWrapper}>
              <Typography.Text>{isHaveAnAccountText}</Typography.Text>

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
