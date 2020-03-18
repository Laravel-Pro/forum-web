import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  DropdownButton,
  Form,
  FormControl,
  FormGroup,
  Dropdown,
  InputGroup,
  FormLabel,
  Button,
} from 'react-bootstrap';
import ChannelContext from 'ChannelContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { postThread } from 'services/thread';


const schema = yup.object({
  channel: yup.string()
    .required('请选择频道'),
  title: yup.string()
    .required('请输入标题'),
  body: yup.string()
    .required('请输入正文'),
});

function NewThread() {
  const { channels } = useContext(ChannelContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      channel: '',
      title: '',
      body: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoading(true);
      const selectedChannel = channels.find((it) => it.slug === values.channel);
      postThread({ channel: selectedChannel.id, title: values.title, body: values.body })
        .then((resp) => {
          const { data } = resp;
          if (data.id) {
            history.push(`/thread/${data.id}`);
          }
        }).finally(() => {
          setLoading(false);
        });
    },
  });

  const selectedChannel = channels.find((it) => it.slug === formik.values.channel);

  const { errors = {}, touched } = formik;

  const hasErrors = touched.channel && touched.title && touched.body
    && (errors.channel || errors.title || errors.body);

  return (
    <Container className="mt-3">
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={selectedChannel ? selectedChannel.name : '请选择频道'}
              id="channel_id"
              onSelect={(eventKey) => {
                formik.getFieldHelpers('channel').setValue(eventKey);
              }}
            >
              {channels.map((ch) => (
                <Dropdown.Item
                  eventKey={ch.slug}
                  key={ch.slug}
                >
                  {ch.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <FormControl
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="请输入标题"
            />
          </InputGroup>
        </FormGroup>
        <FormGroup controlId="body">
          <FormLabel>正文</FormLabel>
          <FormControl
            as="textarea"
            rows="10"
            onChange={formik.handleChange}
            value={formik.values.body}
            isInvalid={hasErrors}
          />
          <FormControl.Feedback type="invalid">{errors.channel}</FormControl.Feedback>
          <FormControl.Feedback type="invalid">{errors.title}</FormControl.Feedback>
          <FormControl.Feedback type="invalid">{errors.body}</FormControl.Feedback>
        </FormGroup>
        <FormGroup>
          <Button type="submit" disabled={loading}>提 交</Button>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default NewThread;
