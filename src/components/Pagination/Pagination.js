import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

export const PaginationPropTypes = PropTypes.shape({
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  onChange: PropTypes.func,
});

class CustomPagination extends React.PureComponent {
  first = () => {
    const { currentPage } = this.props;
    if (currentPage !== 1) {
      this.handleChange(1);
    }
  }

  prev = () => {
    const { currentPage } = this.props;
    if (currentPage > 1) {
      this.handleChange(currentPage - 1);
    }
  }

  next = () => {
    const { currentPage, total, perPage } = this.props;
    if (currentPage < Math.ceil(total / perPage)) {
      this.handleChange(currentPage + 1);
    }
  }

  last = () => {
    const { currentPage, total, perPage } = this.props;
    const pages = Math.ceil(total / perPage);
    if (currentPage < pages) {
      this.handleChange(pages);
    }
  }

  handleChange = (page) => {
    const { onChange, currentPage } = this.props;
    if (page !== currentPage && onChange) {
      onChange(page);
    }
  }

  render() {
    const { currentPage, perPage, total } = this.props;

    const pages = Math.ceil(total / perPage);

    const pageList = [];
    const pageBufferSize = 2;

    if (pages <= 5) {
      for (let i = 1; i <= pages; i += 1) {
        const active = i === currentPage;
        pageList.push(
          <Pagination.Item
            key={i}
            active={active}
            onClick={() => this.handleChange(i)}
          >
            {i}
          </Pagination.Item>,
        );
      }
    } else {
      let left = Math.max(1, currentPage - pageBufferSize);
      let right = Math.max(currentPage + pageBufferSize, pages);
      if (currentPage - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (pages - currentPage <= pageBufferSize) {
        left = pages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i += 1) {
        const active = currentPage === i;
        pageList.push(
          <Pagination.Item
            key={i}
            active={active}
            onClick={() => this.handleChange(i)}
          >
            {i}
          </Pagination.Item>,
        );
      }

      if (left > 2) {
        pageList.unshift(<Pagination.Ellipsis key="prev" disabled />);
      }
      if (right < perPage) {
        pageList.push(<Pagination.Ellipsis key="next" disabled />);
      }
    }

    return (
      <div className="d-flex">
        <Pagination className="justify-content-end flex-grow-1">
          <Pagination.First disabled={currentPage === 1} onClick={this.first} />
          <Pagination.Prev disabled={currentPage === 1} onClick={this.prev} />
          {pageList}
          <Pagination.Next disabled={!total || currentPage === pages} onClick={this.next} />
          <Pagination.Last disabled={!total || currentPage === pages} onClick={this.last} />
        </Pagination>
      </div>
    );
  }
}

CustomPagination.propTypes = PaginationPropTypes.isRequired;

export default CustomPagination;
