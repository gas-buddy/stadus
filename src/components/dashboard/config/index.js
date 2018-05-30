// @flow
import React, { Component } from 'react';
import { Segment, Input } from 'semantic-ui-react';
import store from 'store';

type Props = {}

export default class Config extends Component<Props> {
  db: loki;
  loki: loki;
  state: { collapsed: boolean, config: Object };
  props: { onChange: (Object) => void };

  constructor(props: Props) {
    super(props);
    this.props = props;

    this.configClicked = this.configClicked.bind(this);

    const config = store.get('config') || {};
    window.app = { config: {} };
    window.app.config = config;
    this.state = { collapsed: false, config };
  }

  configClicked() {
    this.setState((prevState) => {
      prevState.collapsed = !prevState.collapsed;
      if (prevState.collapsed) {
        this.props.onChange(prevState.config);
      }
      return prevState;
    });
  }

  handleChange(e, input) {
    this.setState((prevState) => {
      prevState.config[input.name] = input.value;
      store.set('config', prevState.config);
      window.app.config = prevState.config;
      return prevState;
    });
  }

  render() {
    return (
      <Segment>
        <Segment onClick={this.configClicked}>Config</Segment>
        {this.state.collapsed ? (
          <Segment>
            <Input onChange={this.handleChange.bind(this)} name="githubApiKey" value={this.state.config.githubApiKey}/>
            <Input onChange={this.handleChange.bind(this)} name="owner" value={this.state.config.owner}/>
            <Input onChange={this.handleChange.bind(this)} name="repos" value={this.state.config.repos}/>
          </Segment>
        ) : null}
      </Segment>
    );
  }
}
