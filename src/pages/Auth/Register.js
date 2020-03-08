import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button, Col, Form, FormControl,
  FormGroup, FormLabel, Row,
} from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import { registerUser } from 'services/auth';
import UserContext from 'UserContext';
import styles from './Register.module.scss';

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
      registerSuccess: false,
    };
  }

  submit = async (values) => {
    const { username, email, password } = values;
    const resp = await registerUser({ username, email, password });
    const { updateUser } = this.context;
    if (resp.username === username) {
      this.setState({ registerSuccess: true });
      updateUser(resp);
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
    return (
      <Form noValidate onSubmit={handleSubmit}>
        <FormGroup as={Row} controlId="username">
          <FormLabel column md={3}>用户名</FormLabel>
          <Col md={9}>
            <FormControl
              type="text"
              placeholder="请输入用户名"
              value={values.username}
              onChange={handleChange}
              isInvalid={touched.username && !!errors.username}
            />
            <Feedback type="invalid">{errors.username}</Feedback>
          </Col>
        </FormGroup>
        <FormGroup as={Row} controlId="email">
          <FormLabel column md={3}>邮箱</FormLabel>
          <Col md={9}>
            <FormControl
              type="email"
              placeholder="请输入邮箱"
              value={values.email}
              onChange={handleChange}
              isInvalid={touched.email && !!errors.email}
            />
            <Feedback type="invalid">{errors.email}</Feedback>
          </Col>
        </FormGroup>
        <FormGroup as={Row} controlId="password">
          <FormLabel column md={3}>密码</FormLabel>
          <Col md={9}>
            <FormControl
              type="password"
              placeholder="请输入密码"
              value={values.password}
              onChange={handleChange}
              isInvalid={touched.password && !!errors.password}
            />
            <Feedback type="invalid">{errors.password}</Feedback>
          </Col>
        </FormGroup>
        <FormGroup as={Row} controlId="confirm_password">
          <FormLabel column md={3}>确认密码</FormLabel>
          <Col md={9}>
            <FormControl
              type="password"
              placeholder="请确认密码"
              value={values.confirm_password}
              onChange={handleChange}
              isInvalid={touched.confirm_password && !!errors.confirm_password}
            />
            <Feedback type="invalid">{errors.confirm_password}</Feedback>
          </Col>
        </FormGroup>
        <FormGroup as={Row}>
          <Col md={{ span: 9, offset: 3 }}>
            <Button type="submit">提 交</Button>
          </Col>
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
      <div>
        <h2 className="m-4" style={{ textAlign: 'center' }}>新用户注册</h2>
        <div className={styles.formRegister}>
          <Formik
            validationSchema={schema}
            onSubmit={this.submit}
            initialValues={form}
          >
            {this.renderRegisterForm}
          </Formik>
        </div>
      </div>
    );
  }
}

Register.contextType = UserContext;

export default Register;
