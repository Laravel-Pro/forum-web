import React from 'react';
import { withRouter } from 'react-router-dom';
import { Badge, Container, Media } from 'react-bootstrap';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import { getThread } from 'services/thread';

class Thread extends React.PureComponent {
  constructor(props) {
    super(props);

    const { match: { params: { id } } } = this.props;

    this.state = {
      id,
      title: '',
      body: '',
      html: '',
      channel: '',
      author: '',
      createdAt: '',
    };

    this.converter = new showdown.Converter();
  }

  componentDidMount() {
    this.fetchThread();
  }

  renderMarkdown = () => {
    const { body } = this.state;
    const html = this.converter.makeHtml(body);
    this.setState({ html });
  }

  fetchThread = async () => {
    const { id } = this.state;
    const resp = await getThread(id);
    const { data } = resp;
    const { created_at: createdAt, ...restData } = data;
    this.setState({
      ...restData,
      createdAt,
    });
    this.renderMarkdown();
  }

  render() {
    const {
      title, html, channel, author, createdAt,
    } = this.state;

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
        </div>
      </Container>
    );
  }
}

Thread.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Thread);
