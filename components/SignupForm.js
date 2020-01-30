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
import Router from "next/router";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";


const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      username
    }
  }
`;

const SignupForm = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    validate: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    }
  });
  const [
    registerUser,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(REGISTER);

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

  const validatePassword = e => {
    const passwordRex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const newAccount = { ...account };

    if (passwordRex.test(e.target.value)) {
      newAccount.validate.password = "is-valid";
      setAccount(newAccount);
    } else {
      newAccount.validate.password = "is-invalid";
      newAccount.errors.password =
        "비밀번호는 8~20자리 숫자, 문자로 이루어져야 합니다.";
      setAccount(newAccount);
    }
    setAccount({ ...account, password: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    await registerUser({
      variables: { username: account.email, password: account.password }
    })
    .then(response => {
      alert("가입이 완료되었습니다.");
      Router.push("/");
    })
    .catch(err => {
      const newAccount = { ...account };
      newAccount.validate.email = "is-invalid";
      newAccount.errors.email = "이미 존재하는 Email입니다.";
      setAccount(newAccount);
    });
};

  return (
    <Container fluid>
      <Form className="form my-5">
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
            onBlur={validatePassword}
            placeholder="********"
            className={account.validate.password}
            bsSize="lg"
          />
          {account.validate.password == "is-invalid" && (
            <FormFeedback>{account.errors.password}</FormFeedback>
          )}
        </FormGroup>
      </Form>
      {mutationLoading && <p>{registerUser.error}</p>}
      {mutationError && <p>{registerUser.error}</p>}

      <Button onClick={submitForm} block size="lg">
        가입하기
      </Button>
      <Link href="/mobile/login">
        <Button outline block color="secondary" className="mt-4" size="lg">
          취소
        </Button>
      </Link>

      <style jsx global>
        {``}
      </style>
    </Container>
  );
}

// class SignupForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       validate: {
//         emailState: ""
//       }
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   validateEmail(e) {
//     const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     const { validate } = this.state;
//     if (emailRex.test(e.target.value)) {
//       validate.emailState = "has-success";
//     } else {
//       validate.emailState = "has-danger";
//     }
//     this.setState({ validate });
//   }

//   handleChange = async event => {
//     const { target } = event;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const { name } = target;
//     await this.setState({
//       [name]: value
//     });
//   };

//   submitForm(e) {
//     e.preventDefault();
//     console.log(`Email: ${this.state.email}`);
//   }

export default SignupForm;
