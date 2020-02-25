import { Icon, List, Tag, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import ArticleListContent from '../ArticleListContent';
import styles from './index.less';

const Articles = props => {
  const { list } = props;

  const IconText = ({ type, text }) => (
    <span>
      <Icon
        type={type}
        style={{
          marginRight: 8,
        }}
      />
      {text}
    </span>
  );

  return (
    <div>
<List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText key="star" type="star-o" text={item.star} />,
            <IconText key="like" type="like-o" text={item.like} />,
            <IconText key="message" type="message" text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={`/view?postId=${item._id}`}>
                {item.title}
              </a>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
    {!list.length && (<div style={{textAlign: 'center'}}>
      <Button type='primary' style={{margin: '0 auto'}}>写文章</Button>
    </div>)}

    
    </div>
    
  );
};

export default connect(({ accountCenter }) => ({
  list: accountCenter.list,
}))(Articles);
