import React from 'react';
import styles from './Pagination.module.css';
import Button from './Button';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} variant="secondary" className={styles.navButton}>
        <LuChevronLeft /> Previous
      </Button>

      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="secondary" className={styles.navButton}>
        Next <LuChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
