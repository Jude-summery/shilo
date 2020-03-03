import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout'
import { Row, Col, Card, Form, Input, Button, Upload, Icon, message, Avatar } from 'antd';
import { connect } from 'dva';
import { parseLocationSearch } from '@/utils/utils';
import { getFileItem } from 'antd/lib/upload/utils';

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
              postId: parseLocationSearch(location.search).postId
            },
          });
        }
      },
    );
  };

  onDeleteComment = (item) => {
    return () => {
      this.props.dispatch({
        type: 'articleView/deleteComment',
        payload: {
          commentId: item._id,
          postId: item.postId
        },
      })
    }
  }

  getCommentCard = (item) => {
    return(
      <Card style={{marginBottom: 20, height: 120}}>
        <Row>
          <Col span={1}><Avatar src={`/api/user/avatar/get?imgid=${item.author.avatar}`} icon="user" /></Col>
          <Col span={23}>
            <p>{item.author.nickname}:</p>
            <p style={{marginLeft: 20}}>{item.content}</p>
            <p style={{float: 'right', color: '#d9d9d9'}}>{item.created_at} <a onClick={this.onDeleteComment(item)}><Icon type="delete" style={{color: 'rgba(232,17,35,0.3)'}} /></a></p>
          </Col>
        </Row>
    </Card>
    )
  }

  render() {
    const { imageUrl } = this.state;
    const { form, articleView } = this.props;
    const { getFieldDecorator } = form;
    const { post, comments } = articleView
    const title = post && post.title
    return (
      post == null ?
        <p>文章不存在</p> :
        <GridContent>
          <Row gutter={[24, 24]} type="flex" justify="center">
            <Col lg={18} md={24}>
              <Card title={title} bordered={false}>
                <Row gutter={24}>
                  <Col lg={24} md={24}>
                    {post.content}
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
                      <Form.Item style={{marginBottom: '0'}}>
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
                    {comments.map(item=>this.getCommentCard(item))}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </GridContent>
    )
  }
}

export default connect(({ articleView, user, loading }) => ({
  currentUser: user.currentUser,
  articleView,
  submitting: loading.effects['accountSettings/submit'],
}))(Form.create()(ArticleView))
