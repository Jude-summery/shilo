import { Avatar } from 'antd'
import React from 'react'
import moment from 'moment'
import styles from './index.less'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'
import xss from 'xss'

const ArticleListContent = ({ data: { content, created_at, author, href } }) => {
  return (
    <div className={styles.listContent}>
      <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: xss(BraftEditor.createEditorState(content).toHTML()) }}></div>
      <div className={styles.extra}>
        <Avatar src={`/api/user/avatar/get?imgid=${author.avatar}`} size="small" />
        <a href={href}>{author.nickname}</a> 发布于<em>{moment(created_at).format('YYYY-MM-DD HH:mm')}</em>
      </div>
    </div>
  )
};

export default ArticleListContent;
