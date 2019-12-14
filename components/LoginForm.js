import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Container,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Row
} from "reactstrap";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { signin } from '../lib/auth';


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
    <Row className="justify-content-center my-5">
      <Col lg="6" sm="8">
        <Container fluid>
          <h2>로그인</h2>
          <Card>
            <CardBody>
              <Form className="form">
                <Col>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      onBlur={validateEmail}
                      placeholder="myemail@email.com"
                      autoFocus
                      className={account.validate.email}
                    />
                    {account.validate.email == "is-invalid" && (
                      <FormFeedback>{account.errors.email}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">비밀번호</Label>
                    <Input
                      type="password"
                      onBlur={setPassword}
                      placeholder="********"
                      className={account.validate.password}
                      onKeyPress={pressEnter}
                    />
                    {account.validate.password == "is-invalid" && (
                      <FormFeedback>{account.errors.password}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>
              </Form>
              {mutationLoading && <p>{login.error}</p>}
              {mutationError && <p>{login.error}</p>}
            </CardBody>
            <CardFooter className="text-center">
              <Button onClick={submitForm}>로그인</Button>
              <a href="/" className="btn btn-outline-secondary mx-3">
                취소
              </a>
            </CardFooter>
          </Card>
        </Container>
      </Col>

      <style jsx>
        {``}
      </style>
    </Row>
  );
}

export default LoginForm;
