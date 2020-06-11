import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout'
import { Row, Col, Card, Form, Input, Button, Upload, Icon, message, Avatar, Skeleton, Empty, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { connect } from 'dva';
import { parseLocationSearch } from '@/utils/utils';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'
import styles from './index.less'
import xss from 'xss'

class ArticleView extends Component {

  constructor(props) {
    super()

    this.state = {
      current: '0',
      loading: false,
      imageUrl: `/api/user/avatar/get?imgid=${props.currentUser.avatar}` || ''
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'articleView/getPost',
      payload: parseLocationSearch(location.hash)
    })

  }

  parseParam = (search) => {
    const queryObj = {}
    if (search != '') {
      const queryString = search.slice(search.indexOf('?') + 1)
      const queryArray = queryString.split('&')
      queryArray.map(item => {
        queryObj[item.split('=')[0]] = item.split('=')[1]
      })
    }
    return queryObj
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(
      {
        force: true,
      },
      (err, values) => {
        if (!err) {
          dispatch({
            type: 'articleView/addComment',
            payload: {
              content: values.comment,
              postId: parseLocationSearch(location.hash).postId
            },
          });
        }
      },
    );
  };

  onDeleteComment = (item) => {
    const self = this
    return () => {
      Modal.confirm({
        title: '删除文章',
        content: '确定删除该评论？',
        onOk() {
          self.props.dispatch({
            type: 'articleView/deleteComment',
            payload: {
              commentId: item._id,
              postId: item.postId
            },
          })
        }
      })
    }
  }

  getCommentCard = (item) => {
    return (
      <Card style={{ marginBottom: 20, height: 120 }}>
        <Row>
          <Col span={1}><Avatar src={`/api/user/avatar/get?imgid=${item.author.avatar}`} icon="user" /></Col>
          <Col span={23}>
            <p>{item.author.nickname}:</p>
            <p style={{ marginLeft: 20 }}>{item.content}</p>
            <p style={{ float: 'right', color: '#d9d9d9' }}>{item.created_at} <a onClick={this.onDeleteComment(item)}><Icon type="delete" style={{ color: 'rgba(232,17,35,0.3)' }} /></a></p>
          </Col>
        </Row>
      </Card>
    )
  }

  onEdit = (id) => {
    return () => {
      location.href = `#/article/edit?postId=${id}`
    }
  }

  onRemove = (id) => {
    const self = this
    return () => {
      Modal.confirm({
        title: '删除文章',
        content: '确定删除文章？',
        onOk() {
          self.props.dispatch({
            type: 'articleView/deletePost',
            payload: { postId: id }
          })
        }
      })
    }
  }

  render() {
    const { form, articleView, getPostLoading } = this.props;
    const { getFieldDecorator } = form;
    const { post, comments } = articleView;
    const title = post && post.title;
    return (
      <GridContent>
        {
          getPostLoading ?
            <Row gutter={[24, 24]} type="flex" justify="center">
              <Col lg={18} md={24}>
                <Card bordered={false}>
                  <Row gutter={24}>
                    <Col lg={24} md={24}>
                      <Skeleton active paragraph={{ rows: 4 }} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row> :
            post == null ?
              <Row gutter={[24, 24]} type="flex" justify="center">
                <Col lg={18} md={24}>
                  <Card bordered={false}>
                    <Row gutter={24}>
                      <Col lg={24} md={24}>
                        <Empty description={false} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row> :
              <>
                <Row gutter={[24, 24]} type="flex" justify="center">
                  <Col lg={18} md={24}>
                    <Card title={title} bordered={false}>
                      <Row gutter={24}>
                        <Col lg={24} md={24}>
                          <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: xss(BraftEditor.createEditorState(post.content).toHTML()) }}></div>
                          <EditOutlined className={styles.iconEdit} onClick={this.onEdit(post._id)} />
                          <DeleteOutlined className={styles.iconDelete} onClick={this.onRemove(post._id)} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row gutter={[24, 24]} type="flex" justify="center">
                  <Col lg={18} md={24}>
                    <Card bordered={false}>
                      <Row gutter={24}>
                        <Col lg={24} md={24}>
                          <h4>评论区</h4>
                          <Form onSubmit={this.handleSubmit}>
                            <Form.Item style={{ marginBottom: '0' }}>
                              {getFieldDecorator('comment')(
                                <Input.TextArea
                                  rows={3}
                                  size="middle"
                                  placeholder="分享你的见解..."
                                />
                              )}
                            </Form.Item>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                              >
                                提交
                              </Button>
                            </Form.Item>
                          </Form>
                          {comments.map(item => this.getCommentCard(item))}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </>
        }
      </GridContent>
    )
  }
}

export default connect(({ articleView, user, loading }) => ({
  currentUser: user.currentUser,
  articleView,
  getPostLoading: loading.effects['articleView/getPost'],
}))(Form.create()(ArticleView))
