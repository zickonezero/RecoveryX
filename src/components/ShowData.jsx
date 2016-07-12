import React, {Component} from 'react';
import Actions from '../../src/actions/Actions';
import Store from '../../src/stores/Store';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {cyanA100} from 'material-ui/styles/colors';
import {cyanA200} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DropDownMenu from 'material-ui/DropDownMenu';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: cyanA100,
    header: {
      background: cyanA200,
      height: 72,
      fontSize: 30,
      lineHeight: 2.2
    }
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  thumb: {
    maxWidth: '200px',
    minWidth: '100%'
  },
  gridList: {
    width: 200,
    height: 200,
    overflowY: 'auto',
    marginBottom: 24,
  },
  card: {
    width: 200,
    float: 'left'
  }
};

export default class AppBarDrawer extends React.Component {
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
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={styles.appBar}
            onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
            iconElementRight={
              <IconButton><MoreVertIcon/></IconButton>
            }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <div className="drawer-header" style={styles.appBar.header}>SoS</div>
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

var ShowData = React.createClass({
  state: {
    open: false
  },

  handleRequestClose: function() {
    this.setState({
      open: false,
    });
  },

  handleTouchTap: function(text) {
    this.setState({
      open: true,
      dialogueText: text
    });
  },

  menuClick: function() {
    this.setState({
      open: !this.state.open,
    });
    console.log(this.state);
  },

  getInitialState: function() {
    return Store.get();
  },

  componentDidMount: function() {
    Store.addListener('change', this.changeEventHandler);
  },

  changeEventHandler: function() {
    this.setState(Store.get());
  },

  handleChange: function() {
    Actions.set(this.state.value);
  },

  render: function() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      	<div style={styles.container}>
          <AppBarDrawer/>
          <Dialog
              className='dialogue'
              open={this.state.open}
              title="Work"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
            {this.state.dialogueText}
          </Dialog>
          <div style={styles.root}>
            {this.props.dataFeed.map(function(data, i) {
              return (
                <Card style={styles.card}>
                  <CardHeader
                    title={data.proj_title}
                    avatar={data.proj_thumb}
                  />
                  <CardMedia>
                    <img style={styles.thumb} src={data.proj_thumb}/>
                  </CardMedia>
                  <CardTitle/>
                  <CardText>
                    {data.proj_role}
                  </CardText>
                  <CardActions>
                    <FlatButton
                      label="Action1"
                      onTouchTap={this.handleTouchTap.bind(null, data.proj_role)}
                    />
                    <FlatButton label="Action2" />
                  </CardActions>
                </Card>
              );
            }.bind(this))}
          </div>
        </div>
      </MuiThemeProvider>
  )}
});

module.exports = ShowData;
