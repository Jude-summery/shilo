import { Avatar, Card, Col, Divider, Icon, Input, Row, Tag } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Link from 'umi/link';
import { connect } from 'dva';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Applications from './components/Applications';
import styles from './Center.less';

class AccountCenter extends Component {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    tabKey: 'articles',
  };

  input = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountCenter/fetchCurrent',
    });
    dispatch({
      type: 'accountCenter/fetchPosts',
      payload: {author: this.props.currentUser._id}
    });
  }

  getOperationTabList = () => {
    return [
      {
        key: 'articles',
        tab: (
          <span>
            文章{' '}
            <span
              style={{
                fontSize: 14,
              }}
            >
              ({(this.props.list && this.props.list.length) || 0})
            </span>
          </span>
        ),
      }
    ]
  }

  onTabChange = key => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };

  showInput = () => {
    this.setState(
      {
        inputVisible: true,
      },
      () => this.input && this.input.focus(),
    );
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;

    if (inputValue && newTags.filter(tag => tag.label === inputValue).length === 0) {
      newTags = [
        ...newTags,
        {
          key: `new-${newTags.length}`,
          label: inputValue,
        },
      ];
    }

    this.setState({
      newTags,
      inputVisible: false,
      inputValue: '',
    });
  };

  renderChildrenByTabKey = tabKey => {
    if (tabKey === 'articles') {
      return <Articles />;
    }

    return null;
  };

  render() {
    const { newTags = [], inputVisible, inputValue, tabKey } = this.state;
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="avatar" src={`/api/user/get/avatar?imgid=${currentUser.avatar}`} />
                    <div className={styles.name}>{currentUser.nickname || currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {currentUser.title}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>标签</div>
                    {(currentUser.tags || []).concat(newTags).map(item => (
                      <Tag key={item.key}>{item.label}</Tag>
                    ))}
                    {inputVisible && (
                      <Input
                        ref={ref => this.saveInputRef(ref)}
                        type="text"
                        size="small"
                        style={{
                          width: 78,
                        }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{
                          background: '#fff',
                          borderStyle: 'dashed',
                        }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider
                    style={{
                      marginTop: 16,
                    }}
                    dashed
                  />
                </div>
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={this.getOperationTabList()}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(({ loading, accountCenter }) => ({
  currentUser: accountCenter.currentUser,
  currentUserLoading: loading.effects['accountCenter/fetchCurrent'],
}))(AccountCenter);
