import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button, Card, Col, Form, FormControl,
  FormGroup, Row,
} from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import { registerUser } from 'services/auth';
import UserContext from 'UserContext';

const schema = yup.object({
  username: yup.string()
    .required('请输入用户名')
    .min(4, '用户名不能少于4字符')
    .max(40, '用户名不能多于40字符')
    .matches(/^[A-Za-z0-9][A-Za-z0-9_-]{3,39}$/, '用户名请用字母或数字开头，可以加入\'_\'、\'-\''),
  email: yup.string()
    .email('请输入有效的邮箱')
    .required('请输入邮箱'),
  password: yup.string()
    .min(8, '密码不能少于8位')
    .max(100, '密码不能多于100位')
    .required('请输入密码'),
  confirm_password: yup.string()
    .required('请确认密码')
    .when('password', {
      is: (val) => !!(val && val.length > 0),
      then: yup.string().oneOf([yup.ref('password')], '两次密码输入不同'),
    }),
});

const { Feedback } = FormControl;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      usernameError: '',
      emailError: '',
      registerSuccess: false,
    };
  }

  submit = async (values) => {
    const { username, email, password } = values;
    try {
      const resp = await registerUser({ username, email, password });
      const { updateUser } = this.context;
      if (resp.username === username) {
        this.setState({ registerSuccess: true });
        updateUser(resp);
      }
    } catch (e) {
      const { body, status } = e;
      if (status === 422) {
        const { errors = {} } = body;
        const { username: usernameErrors, email: emailErrors } = errors;
        this.setState({
          usernameError: usernameErrors[0],
          emailError: emailErrors[0],
        });
      }
    }
  }

  renderRegisterForm = (props) => {
    const {
      handleSubmit,
      handleChange,
      values,
      touched,
      errors,
    } = props;
    const { usernameError, emailError } = this.state;

    const usernameInvalid = (touched.username && !!errors.username) || !!usernameError;
    const usernameErrors = usernameError || errors.username;

    const emailInvalid = (touched.email && !!errors.email) || !!emailError;
    const emailErrors = emailError || errors.email;

    return (
      <Form noValidate onSubmit={handleSubmit}>
        <FormGroup controlId="username">
          <FormControl
            type="text"
            placeholder="请输入用户名"
            value={values.username}
            onChange={handleChange}
            isInvalid={usernameInvalid}
          />
          <Feedback type="invalid">{usernameErrors}</Feedback>
        </FormGroup>
        <FormGroup controlId="email">
          <FormControl
            type="email"
            placeholder="请输入邮箱"
            value={values.email}
            onChange={handleChange}
            isInvalid={emailInvalid}
          />
          <Feedback type="invalid">{emailErrors}</Feedback>
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            type="password"
            placeholder="请输入密码"
            value={values.password}
            onChange={handleChange}
            isInvalid={touched.password && !!errors.password}
          />
          <Feedback type="invalid">{errors.password}</Feedback>
        </FormGroup>
        <FormGroup controlId="confirm_password">
          <FormControl
            type="password"
            placeholder="请确认密码"
            value={values.confirm_password}
            onChange={handleChange}
            isInvalid={touched.confirm_password && !!errors.confirm_password}
          />
          <Feedback type="invalid">{errors.confirm_password}</Feedback>
        </FormGroup>
        <FormGroup>
          <Button type="submit">提交</Button>
        </FormGroup>
      </Form>
    );
  }

  render() {
    const { form, registerSuccess } = this.state;
    if (registerSuccess) {
      return (
        <div className="success">
          <h2 className="m-4 text-center">注册成功</h2>
          <Redirect to="/" />
        </div>
      );
    }
    return (
      <Row>
        <Col sm={12} md={10} lg={8} xl={4} className="m-auto" style={{ maxWidth: 400 }}>
          <h2 className="m-4 text-center">新用户注册</h2>
          <Card className="shadow">
            <Card.Body className="p-4">
              <Formik
                validationSchema={schema}
                onSubmit={this.submit}
                initialValues={form}
              >
                {this.renderRegisterForm}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

Register.contextType = UserContext;

export default Register;
