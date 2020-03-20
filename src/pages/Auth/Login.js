import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Card, Col, Form, FormControl, FormGroup, Row,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import UserContext from 'UserContext';
import { login } from 'services/auth';

const schema = yup.object({
  loginAs: yup.string().required('请输入用户名'),
  password: yup.string().required('请输入用密码'),
});

const { Feedback } = FormControl;

function LoginFrom() {
  const { updateUser } = useContext(UserContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      channel: '',
      title: '',
      body: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const { loginAs, password } = values;

      login({ loginAs, password }).then((user) => {
        if (user.id) {
          updateUser(user);
          history.push('/');
        }
      });
    },
  });

  const {
    errors = {}, touched, handleChange, values,
  } = formik;

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <FormGroup controlId="loginAs">
        <FormControl
          placeholder="用户名"
          type="text"
          isInvalid={touched.loginAs && !!errors.loginAs}
          value={values.loginAs}
          onChange={handleChange}
        />
        <Feedback type="invalid">{errors.loginAs}</Feedback>
      </FormGroup>
      <FormGroup controlId="password">
        <FormControl
          placeholder="密码"
          type="password"
          value={values.password}
          onChange={handleChange}
          isInvalid={touched.password && !!errors.password}
        />
        <Feedback type="invalid">{errors.password}</Feedback>
      </FormGroup>
      <FormGroup>
        <Button type="submit">提交</Button>
      </FormGroup>
    </Form>
  );
}

function Login() {
  return (
    <Row>
      <Col sm={12} md={10} lg={8} xl={4} className="m-auto" style={{ maxWidth: 400 }}>
        <h2 className="m-4 text-center">登录</h2>
        <Card className="shadow">
          <Card.Body className="p-4">
            <LoginFrom />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
