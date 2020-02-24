import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout'
import { Row, Col, Card, Form, Input, Button, Upload, Icon, message, Avatar } from 'antd';
import { connect } from 'dva';
import { parseLocationSearch } from '@/utils/utils';

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
      payload: parseLocationSearch(location.search)
    })
  }

  parseParam = (search) => {
    const queryObj = {}
    if(search != ''){
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
            type: 'articleEdit/submit',
            payload: values,
          });
        }
      },
    );
  };

  render() {
    const { imageUrl } = this.state;
    const { form, articleView } = this.props;
    const { post, comments } = articleView.data
    const title = post && post.title
    return (
      post == null ?
      <p>文章不存在</p>:
      <GridContent>
        <Row gutter={24} type="flex" justify="center">
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
      </GridContent>
    )
  }
}

export default connect(({ articleView, user }) => ({
  currentUser: user.currentUser,
  articleView,
}))(Form.create()(ArticleView))
