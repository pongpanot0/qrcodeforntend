import React, { useState } from "react";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormRow,
  FormLabel,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle,
} from "./FormStyles";
import { Container } from "../globarStyles";
import validateForm from "./validateForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [position, setposition] = useState("");
  let navigate = useNavigate();
  const Login = () => {
    const resultError = validateForm({ name, email, password, confirmPass });
    if (resultError !== null) {
        
        setError(resultError);
        return;
      }
    axios
      .post(`${process.env.REACT_APP_API_KEY}/register`, {
        email: email,
        password: password,
        name: name,
        first_name: first_name,
        last_name: last_name,
        position: position,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.code === 0) {
          navigate("/users/login");
        }
        if (res.data.status === 400) {
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultError = validateForm({ name, email, password, confirmPass });
    if (resultError !== null) {
      setError(resultError);
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setfirst_name("");
    setlast_name("");
    setposition("");
    setError(null);
    setSuccess("Application was submitted!");
  };
  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };
  const formData = [
    {
      label: "Name",
      value: name,
      onChange: (e) => setName(e.target.value),
      type: "text",
    },
    {
      label: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      type: "email",
    },
    {
      label: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: "password",
    },
    {
      label: "Confirm Password",
      value: confirmPass,
      onChange: (e) => setConfirmPass(e.target.value),
      type: "password",
    },
    {
      label: "first_name",
      value: first_name,
      onChange: (e) => setfirst_name(e.target.value),
      type: "first_name",
    },
    {
      label: "last_name",
      value: last_name,
      onChange: (e) => setlast_name(e.target.value),
      type: "last_name",
    },
    {
      label: "position",
      value: position,
      onChange: (e) => setposition(e.target.value),
      type: "position",
    },
  ];

  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Sign up</FormTitle>
            <FormWrapper onSubmit={handleSubmit}>
              {formData.map((el, index) => (
                <FormInputRow key={index}>
                  <FormLabel>{el.label}</FormLabel>
                  <FormInput
                    type={el.type}
                    placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
                    value={el.value}
                    onChange={el.onChange}
                  />
                </FormInputRow>
              ))}

              <FormButton type="submit" onClick={Login}>
                Signup
              </FormButton>
            </FormWrapper>
            {error && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
                error
              >
                {error}
              </FormMessage>
            )}
            {success && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {success}
              </FormMessage>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};
export default Form;
