import React from 'react';
import './Message.scss';
import PropTypes from 'prop-types';

/* Standard message alert to the user component */
const Message = (props) => {
  return (
    <div className='item-list-container'>
      <div className='item-list'>
        <div className='message'>
          <h4 style={{ display: 'inline' }}>{props.children} </h4>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Message;
