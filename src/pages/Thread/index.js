import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Badge, Container, Media } from 'react-bootstrap';
import showdown from 'showdown';
import { getThread } from 'services/thread';
import { ReplyList } from 'components';
import { getReplies, postReply } from 'services/reply';

const converter = new showdown.Converter();

function Thread() {
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 50,
    total: 0,
  });

  const { params: { id: threadId } } = useRouteMatch('/thread/:id');

  useEffect(() => {
    const fetchThreads = async () => {
      const { data } = await getThread(threadId);
      const html = converter.makeHtml(data.body);
      setThread({ ...data, html });
    };
    fetchThreads();
  }, [threadId]);

  useEffect(() => {
    if (!thread || !thread.id) {
      return;
    }
    const fetchReplies = async () => {
      const resp = await getReplies(thread.id, pagination.currentPage);
      setReplies(resp.data);
      setPagination(resp.pagination);
    };
    fetchReplies();
  }, [thread, pagination.currentPage]);

  const handleReply = async ({ body }) => {
    const { data } = await postReply(body, threadId);
    if (data) {
      window.location.reload();
    }
  };

  if (!thread) {
    return null;
  }

  const {
    title, html, channel, author, created_at: createdAt,
  } = thread;

  return (
    <Container className="mt-2">
      <div className="thread-detail">
        <Media className="thread p-2">
          <Media.Body>
            <h5 className="thread-title">
              <Badge variant="light" className="mr-2 channel-name">{channel.name}</Badge>
              {title}
            </h5>
            <span className="text-muted small">{`由 ${author.username} 发布于 ${createdAt}`}</span>
          </Media.Body>
          <img
            width={64}
            height={64}
            className="align-self-end ml-auto"
            src={author.avatar_url}
            alt={`avatar of ${author.username}`}
          />
        </Media>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
        <ReplyList
          replies={replies}
          onReply={handleReply}
          pagination={{
            ...pagination,
            onChange: (page) => {
              setPagination({ ...pagination, currentPage: page });
            },
          }}
        />
      </div>
    </Container>
  );
}

export default Thread;
