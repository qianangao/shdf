import React from 'react';
import classNames from 'classnames';

const FontIcon = ({ type, className, ...props }) => (
  <svg className={classNames('icon', className)} aria-hidden="true" {...props}>
    <use xlinkHref={`#icon-${type}`} />
  </svg>
);
export default FontIcon;
