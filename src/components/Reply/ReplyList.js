import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormControl, FormGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Pagination, { PaginationPropTypes } from 'components/Pagination/Pagination';
import Reply from './Reply';

function ReplyList(props) {
  const {
    replies = [],
    onReply,
    pagination,
    canReply,
  } = props;

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string()
        .required('请输入评论内容'),
    }),
    onSubmit: onReply,
  });

  const {
    currentPage, perPage, total,
  } = pagination;

  return (
    <div className="reply-list">
      <ul className="list-unstyled">
        {replies.map((reply) => (
          <Reply
            key={reply.id}
            body={reply.body}
            owner={reply.owner}
            createdAt={reply.created_at}
          />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        total={total}
        layout={{
          first: false,
          prev: false,
          next: false,
          last: false,
        }}
        size="sm"
        onChange={pagination.onChange}
      />
      <hr />
      {canReply ? (
        <Form className="reply-form" onSubmit={formik.handleSubmit}>
          <FormGroup controlId="body">
            <FormControl
              as="textarea"
              rows="2"
              placeholder="评论"
              onChange={formik.handleChange}
              value={formik.values.body}
              isInvalid={formik.errors.body}
            />
            <FormControl.Feedback type="invalid">{formik.errors.body}</FormControl.Feedback>
          </FormGroup>
          <FormGroup>
            <Button type="submit" data-test="submit">评论</Button>
          </FormGroup>
        </Form>
      ) : null}
    </div>
  );
}

ReplyList.propTypes = {
  replies: PropTypes.arrayOf(PropTypes.object),
  onReply: PropTypes.func,
  pagination: PaginationPropTypes,
  canReply: PropTypes.bool,
};

ReplyList.defaultProps = {
  replies: [],
  onReply: () => {
  },
  pagination: {
    currentPage: 1,
    perPage: 50,
    total: 0,
  },
  canReply: false,
};

export default ReplyList;
