import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Actions from '../../src/actions/Actions';
import Store from '../../src/stores/Store';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {cyanA100} from 'material-ui/styles/colors';
import {cyan400} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

const styles = {
  appBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.66)',
    position: 'absolute',
    boxShadow: 'none',
    header: {
      height: 90,
      fontSize: 30,
      lineHeight: 3,
    },
    iconLeft: {
      padding: 0,
      display: 'none'
    }
  },
  otherMenu: {
    color: 'rgb(0, 151, 167)',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: 7,
    top: 1,
    underline: {
      display: 'none'
    }
  }
};

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  goToPage(loc) {
    window.location = loc;
  }

  render() {
    return (
      <div className="dt-menu">
        <FlatButton onClick={this.goToPage.bind(null, '/surfing')} label="Surfing" primary={true}/>
        <FlatButton label="Skating" primary={true}/>
        <FlatButton label="Snowboarding" primary={true}/>
        <FlatButton label="Skiing" primary={true}/>
        <DropDownMenu
          labelStyle={styles.otherMenu}
          value={this.state.value}
          underlineStyle={styles.otherMenu.underline}
        >
          <MenuItem value={1} primaryText="Other" />
          <MenuItem value={2} primaryText="Running" />
          <MenuItem value={3} primaryText="Hiking" />
          <MenuItem value={4} primaryText="Swimming" />
          <MenuItem value={5} primaryText="Add a sport" />
        </DropDownMenu>
      </div>
    );
  }
}

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 1
    };
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  handleClose() {
    this.setState({
      open: !this.state.open
    });
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <AppBar
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconClassNameLeft="app-bar-burger"
          className="app-bar"
          iconStyleLeft={styles.appBar.iconLeft}
        >
          <Menu/>
        </AppBar>

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div className="drawer-header" style={styles.appBar.header}></div>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Surfing</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Skating</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Snowboarding</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Skiing</MenuItem>
          <DropDownMenu value={this.state.value}>
            <MenuItem value={1} primaryText="Other" />
            <MenuItem value={2} onTouchTap={this.handleClose.bind(this)} primaryText="Running" />
            <MenuItem value={3} onTouchTap={this.handleClose.bind(this)} primaryText="Hiking" />
            <MenuItem value={4} onTouchTap={this.handleClose.bind(this)} primaryText="Swimming" />
            <MenuItem value={5} onTouchTap={this.handleClose.bind(this)} primaryText="Add a sport" />
          </DropDownMenu>
        </Drawer>
      </div>
    );
  }
}

module.exports = Nav;