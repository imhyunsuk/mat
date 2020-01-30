import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Button,
} from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { signin } from '../lib/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        username
      }
      token
    }
  }
`;

const LoginForm = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    validate: {
      email: "",
      password: ""
    },
    errors: {
      password: ""
    }
  });
  const [
    login,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(LOGIN);

  const validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const newAccount = { ...account };

    if (emailRex.test(e.target.value)) {
      newAccount.validate.email = "is-valid"
      setAccount(newAccount);
    } else {
      newAccount.validate.email = "is-invalid";
      newAccount.errors.email = "잘못된 Email입니다.";
      setAccount(newAccount);
    }
    setAccount({ ...account, email: e.target.value });
  };

  const setPassword = e => {
    setAccount({ ...account, password: e.target.value });
  };

  const submitForm = async (e) => {
    await login({ variables: { username: account.email, password: account.password } })
    .then((res)=>{
      const { user, token } = res.data.login;
      signin({ user, token });
    })
    .catch(err=>{
      alert(err)
      const newAccount = { ...account };
      newAccount.validate.email = "is-invalid";
      newAccount.errors.email = "이미 존재하는 Email입니다.";
      setAccount(newAccount);
    })
  };

  const pressEnter = e => {
    if (e.key === 'Enter') submitForm();
  };

  return (
    <Container fluid>
      <Form className="my-5">
        <FormGroup>
          <h6>Email</h6>
          <Input
            type="email"
            onBlur={validateEmail}
            placeholder="myemail@email.com"
            autoFocus
            className={account.validate.email}
            bsSize="lg"
          />
          {account.validate.email == "is-invalid" && (
            <FormFeedback>{account.errors.email}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup className="mt-4">
          <h6>비밀번호</h6>
          <Input
            type="password"
            onChange={setPassword}
            placeholder="********"
            className={account.validate.password}
            onKeyPress={pressEnter}
            bsSize="lg"
          />
          {account.validate.password == "is-invalid" && (
            <FormFeedback>{account.errors.password}</FormFeedback>
          )}
        </FormGroup>
      </Form>
      {mutationLoading && <p>{login.error}</p>}
      {mutationError && <p>{login.error}</p>}
      <Button onClick={submitForm} block size="lg">
        로그인
      </Button>
      <Link href="/mobile/signup">
        <Button color="info" outline block size="lg" className="mt-5">
          회원가입 <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </Link>
      <style jsx>{``}</style>
    </Container>
  );
}

export default LoginForm;
