/*eslint react/jsx-filename-extension: 0 */
/*eslint react/prop-types: 0 */

import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import HomePageComponent from './HomePageComponent';
import '../styles/ListUrlComponent.css';
import * as Rx from 'rxjs-compat'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ListUrlComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listdata: [],
      data: [],
      expanded: false
    };
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentWillMount() {
    Rx.Observable.fromPromise(fetch('/apps').then((data) => data.json()))
      .subscribe((data) => {
        this.setState({
          data: data
        })
      });
  }

  test(name){
      fetch(`/downloadLog/${name}`)
  }

  render() {
    const { classes } = this.props;

    console.log(this.state.data)
    return (
      <div>
        <HomePageComponent />
        {this.state.data.map((x, i) =>
          <div className="root">
            <Card className="card">
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className="avatar">
                    <CheckCircle className="checkCircle" />
                  </Avatar>
                }
                title={x.app_name + "( Id: " + x.appId + " )"}
                subheader="September 14, 2016"
              />
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <button onClick={()=>this.test(x.app_name)}> click me  </button>

              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  Test
          </CardContent>
              </Collapse>
            </Card>
          </div>
        )
        }
      </div>
    );
  }
}
//export default (ListUrlComponent);
export default withStyles(styles)(ListUrlComponent);
