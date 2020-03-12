import React from "react";
import {
  Form,
  FormGroup,
  Row,
  FormLabel,
  Col,
  FormControl,
  Button
} from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import UserContext from "UserContext";
import { login } from "services/auth";

const schema = yup.object({
  loginAs: yup.string().required("请输入用户名"),
  password: yup.string().required("请输入用密码")
});

const { Feedback } = FormControl;

class Login extends React.Component {
  submit = async values => {
    const { loginAs, password } = values;
    const resp = await login({ loginAs, password });
    this.context.updateUser(resp);
  };
  renderLoginFrom = props => {
    const { handleSubmit, handleChange, values, touched, errors } = props;
    return (
      <Form noValidate onSubmit={handleSubmit}>
        <FormGroup as={Row} controlId="loginAs">
          <FormLabel column md={3}>
            用启名
          </FormLabel>
          <Col>
            <FormControl
              type="text"
              isInvalid={touched.loginAs && !!errors.loginAs}
              value={values.loginAs}
              onChange={handleChange}
            />
            <Feedback type="invalid">{errors.loginAs}</Feedback>
          </Col>
        </FormGroup>
        <FormGroup as={Row} controlId="password">
          <FormLabel column md={3}>
            密码
          </FormLabel>
          <Col>
            <FormControl
              value={values.password}
              onChange={handleChange}
              type="text"
            />
          </Col>
        </FormGroup>
        <FormGroup as={Row}>
          <Col>
            <Button type="submit">提交</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  };
  render() {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{ loginAs: "", password: "" }}
        onSubmit={this.submit}
      >
        {this.renderLoginFrom}
      </Formik>
    );
  }
}

Login.contextType = UserContext;

export default Login;
