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

    const config = store.get('config') || { owner: '', repos: '', githubApiKey: '' };
    this.state = { collapsed: true, config };
    this.props.onChange(this.state.config);
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
      return prevState;
    });
  }

  render() {
    return (
      <Segment>
        <Segment onClick={this.configClicked}>Config</Segment>
        {!this.state.collapsed ? (
          <Segment>
            <Input onChange={this.handleChange.bind(this)} name="githubApiKey" placeholder="GitHub Api Key" value={this.state.config.githubApiKey}/>
            <Input onChange={this.handleChange.bind(this)} name="owner" placeholder="GitHub Organization" value={this.state.config.owner}/>
            <Input onChange={this.handleChange.bind(this)} name="repos" placeholder="Comma-separated repo name"value={this.state.config.repos}/>
          </Segment>
        ) : null}
      </Segment>
    );
  }
}
