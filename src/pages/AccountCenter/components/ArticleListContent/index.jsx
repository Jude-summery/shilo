import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

const ArticleListContent = ({ data: { content, created_at, author, href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={`/api/user/avatar/get?imgid=${author.avatar}`} size="small" />
      <a href={href}>{author.nickname}</a> 发布于<em>{moment(created_at).format('YYYY-MM-DD HH:mm')}</em>
      
    </div>
  </div>
);

export default ArticleListContent;
