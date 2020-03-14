import React from 'react';
import PropTypes from 'prop-types';
import Pagination, { PaginationPropTypes } from 'components/Pagination/Pagination';
import Thread, { ThreadPropTypes } from './Thread';

class ThreadList extends React.PureComponent {
  handleChange = (page) => {
    const { pagination: { onChange } } = this.props;
    if (onChange) {
      onChange(page);
    }
  }

  render() {
    const { threads, pagination } = this.props;
    const {
      currentPage, perPage, total,
    } = pagination;
    return (
      <div className="thread-list">
        <ul className="list-unstyled">
          {threads.map((it) => <Thread key={it.id} thread={it} />)}
        </ul>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          total={total}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(ThreadPropTypes).isRequired,
  pagination: PaginationPropTypes.isRequired,
};

export default ThreadList;
