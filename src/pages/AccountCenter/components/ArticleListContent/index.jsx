import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'

function isJsonString(str) {
  try {
    console.log(JSON.parse(JSON.parse(str)), 56565656565656 , str)
    if (typeof JSON.parse(str) === 'object') { return true }
  } catch (e) { return false }
  return false
}

const ArticleListContent = ({ data: { content, created_at, author, href } }) => {
  return (
    <div className={styles.listContent}>
      {isJsonString(content) ? <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: BraftEditor.createEditorState(JSON.parse(content)).toHTML() }}></div> : <div className={styles.description}>{content}</div>}
      <div className={styles.extra}>
        <Avatar src={`/api/user/avatar/get?imgid=${author.avatar}`} size="small" />
        <a href={href}>{author.nickname}</a> 发布于<em>{moment(created_at).format('YYYY-MM-DD HH:mm')}</em>
      </div>
    </div>
  )
};

export default ArticleListContent;
