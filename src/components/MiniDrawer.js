import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LetterAvatars from './LetterAvatars';
//import SimpleBottomNavigation from './SimpleBottomNavigation';
//import BottomNavigation, {BottomNavigationAction} from '@material-ui/core/BottomNavigation';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import ExploreIcon from '@material-ui/icons/Explore';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import {chats, messages} from './mock-data';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: "100%",
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    position: 'fixed',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,    
  },
  drawerPaper: {
    width: drawerWidth,
    
    height: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  chatList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  
  },
  drawerHeader:{
    ... theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit *3,
    paddingRight: theme.spacing.unit * 3,
  },
  newChatButton:{
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3 + 48,
  },
  chatLayout: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    overflow: 'hidden',
    
  },
  messagesWrapper: {
    overflowX: 'scroll',
    heigth: '100%',
    width: '100%',
    paddingTop: theme.spacing.uint *3,
    paddingBottom: '120px',
  },
  messageInputWrapper:{
    position: "fixed",
    left:'auto',
    right: 0,
    bottom: 0,
    width: `calc(100% - ${drawerWidth+60}px)`,
    padding: '30px 30px',
  },
  messageInput: {
    padding: theme.spacing.unit * 2,
  },
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '${theme.spacing.unit}px ${theme.spacing.unit * 3}px',
  },
  messageWrapperFromMe:{
    justifyContent: 'flex-end',
  },
  message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
  },
  messageFromMe: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff',
    
  },
  bottomNavigation:{
    position: "fixed",
    left: 0,
    bottom: 0,    
    padding: theme.spacing.unit *3,
  },
});

function PermanentDrawerLeft(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>    
     
      <AppBar color='primary' className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Alex M
          </Typography>
        </Toolbar>
      </AppBar>     
       
      <Drawer        
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}       
      > 
        <div className={classes.drawerHeader}>
        <TextField 
          fullWidth
          margin='normal'
          placeholder="Поиск"/>  
        </div>
        <Divider />
    
        <List className={classes.chatList}>
          {['All mail', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Trash', 'Spam', 'Erash', 'Dpam'].map((text, index) => (
            <ListItem button key={index}>
              <LetterAvatars avType='name' children={text}/>
            </ListItem>
          ))}
        </List>
       
        <Button
          variant='fab'
          color='primary'
          className={classes.newChatButton}
        >
          <AddIcon />
        </Button>
        <BottomNavigation showLabels /*className={classes.bottomNavigation} */ >
            <BottomNavigationAction label='MyChats' icon={<RestoreIcon />} />
            <BottomNavigationAction label='Explore' icon={<ExploreIcon />} />
        </BottomNavigation>
       
      </Drawer>
      <main className={classes.chatLayout}>
        <div className={classes.messagesWrapper} >
          {messages && messages.map((message, index) => {
            const isMessageFromMe = message.sender === 'me';
            const userAvatar = (
              <LetterAvatars avType='chat'>
                {message.sender[0]}
              </LetterAvatars>
            );

            return (
              <div key={index} className={[
                classes.messageWrapper,
                isMessageFromMe ? classes.messageWrapperFromMe : ''
              ].join(' ')}>
                {!isMessageFromMe && userAvatar}
                <Paper className = {[
                  classes.message,
                  isMessageFromMe ? classes.messageFromMe : ''
                ].join(' ')}>
                  <Typography variant='caption'>
                    {message.sender}
                  </Typography>
                  <Typography variant='body1'>
                    {message.content}
                  </Typography>
                </Paper>
                {isMessageFromMe && userAvatar}
              </div>
            );
          })}
        </div>



        <div className={classes.messageInputWrapper}>
            <Paper className={classes.messageInput} elevation={6}>
              <Input fullWidth placeholder='Ваше сообщение' />
            </Paper>
        </div>
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);
