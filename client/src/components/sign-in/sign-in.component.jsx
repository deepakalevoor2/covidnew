import React, { useState } from "react";
import { Redirect } from "react-router-dom";
//import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signin, authenticate, isAuthenticated } from "../../apis";

//import { emailSignInStart } from "../../redux/user/user.actions";

import { SignInContainer, ButtonsBarContainer } from "./sign-in.styles";

const SignIn = () => {
  // const [userCredentials, setCredentials] = useState({
  //   email: "",
  //   password: "",
  // });

  // const { email, password } = userCredentials;

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   emailSignInStart(email, password);
  // };

  // const handleChange = (event) => {
  //   const { value, name } = event.target;

  //   setCredentials({ ...userCredentials, [name]: value });
  // };
  const [values, setValues] = useState({
    email: "shreyaspro18@gmail.com",
    password: "saregama123",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading } = values;
  //const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            error: "",
            didRedirect: true,
          });
        });
      }
    });
    //.catch(console.log("signin request failed"));
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="ui red message">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const performRedirect = () => {
    //console.log("redir");
    if (isAuthenticated()) {
      //console.log("isauth");
      return <Redirect to="/" />;
    }
  };

  const errorMessage = () => {
    return (
      <div className="column" style={{ display: error ? "" : "none" }}>
        <div className="ui segment">
          <div
            className="ui red message"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <SignInContainer>
      <span>Sign in with your email and password</span>

      <form>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange("email")}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange("password")}
          label="password"
          required
        />
        <ButtonsBarContainer>
          <CustomButton onClick={onSubmit} type="submit">
            Sign in
          </CustomButton>
        </ButtonsBarContainer>
      </form>
      {loadingMessage()}
      {errorMessage()}
      {performRedirect()}
    </SignInContainer>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   emailSignInStart: (email, password) =>
//     dispatch(emailSignInStart({ email, password })),
// });

// export default connect(null, mapDispatchToProps)(SignIn);
export default SignIn;
