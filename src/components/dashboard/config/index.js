// @flow
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
import configStore from '../../../utils/config-store';
import store from 'store';
import Style from './style.css';

type Props = {}

export default class Config extends Component<Props> {
  db: loki;
  loki: loki;
  state: { opened: boolean, config: Object };
  props: { onChange: (Object) => void };
  defaultConfig = {
    githubApiKey: '',
    owner: '',
    repos: '',
  }

  constructor(props: Props) {
    super(props);
    this.props = props;

    this.configClicked = this.configClicked.bind(this);

    const config = store.get('config') || this.defaultConfig;
    configStore.githubApiKey = config.githubApiKey;

    this.state = { opened: false, config };
    this.props.onChange(this.state.config);
  }

  configClicked() {
    this.setState((prevState) => {
      prevState.opened = !prevState.opened;
      if (!prevState.opened) {
        this.props.onChange(prevState.config);
      }
      return prevState;
    });
  }

  handleChange(e) {
    const target = e.target;
    this.setState((prevState) => {
      prevState.config[target.name] = target.value;

      configStore.githubApiKey = prevState.config.githubApiKey;
      store.set('config', prevState.config);
      return prevState;
    });
  }

  render() {
    return (
      <Segment className={[Style.configPanel, this.state.opened ? Style.opened : Style.closed].join(' ')}>
        <Segment className={Style.configHeader}>
          <span onClick={this.configClicked}>Config <FontAwesome name="cog" /></span>
        </Segment>
        {this.state.opened ? (
          <Segment className={Style.configOptions}>
            {Object.keys(this.defaultConfig).map((configProperty) => (
              <div key={configProperty} className={Style.inputEffect}>
                <input
                  className={[Style.input, this.state.config[configProperty] ? Style.populated : undefined].join(' ')}
                  onChange={this.handleChange.bind(this)}
                  id={`config_${configProperty}`}
                  name={configProperty}
                  value={this.state.config[configProperty]}/>
                <label htmlFor={`config_${configProperty}`}>{configProperty}</label>
                <span className={Style.focusBorder}></span>
              </div>
              
            ))}
          </Segment>
        ) : null}
      </Segment>
    );
  }
}
