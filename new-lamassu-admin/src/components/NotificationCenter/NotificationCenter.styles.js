import {
  spacer,
  white,
  zircon,
  secondaryColor,
  spring3,
  comet
} from 'src/styling/variables'

const styles = {
  container: {
    '@media only screen and (max-width: 1920px)': {
      width: '30vw'
    },
    width: '40vw',
    height: '110vh',
    right: 0,
    backgroundColor: white,
    boxShadow: '0 0 14px 0 rgba(0, 0, 0, 0.24)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerText: {
    marginTop: spacer * 2.5,
    marginLeft: spacer * 3
  },
  actionButtons: {
    display: 'flex',
    marginLeft: spacer * 2,
    height: 0
  },
  notificationIcon: ({ buttonCoords, xOffset }) => ({
    position: 'absolute',
    top: buttonCoords ? buttonCoords.y : 0,
    left: buttonCoords ? buttonCoords.x - xOffset : 0,
    cursor: 'pointer',
    background: 'transparent',
    boxShadow: '0px 0px 0px transparent',
    border: '0px solid transparent',
    textShadow: '0px 0px 0px transparent',
    outline: 'none'
  }),
  clearAllButton: {
    marginTop: -spacer * 2,
    marginLeft: spacer,
    backgroundColor: zircon
  },
  notificationsList: {
    height: '90vh',
    maxHeight: '100vh',
    marginTop: spacer * 3,
    marginLeft: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: white,
    zIndex: 10
  },
  notificationRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
    marginBottom: spacer / 2,
    paddingTop: spacer * 1.5,
    '& > *:first-child': {
      marginRight: 24
    },
    '& > *': {
      marginRight: 10
    },
    '& > *:last-child': {
      marginRight: 0
    }
  },
  notificationContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 300
  },
  unread: {
    backgroundColor: spring3
  },
  notificationRowIcon: {
    alignSelf: 'center',
    '& > *': {
      marginLeft: spacer * 3
    }
  },
  readIconWrapper: {
    flexGrow: 1
  },
  unreadIcon: {
    marginTop: 2,
    width: '12px',
    height: '12px',
    backgroundColor: secondaryColor,
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1
  },
  readIcon: {
    marginLeft: spacer,
    marginTop: 5,
    width: '12px',
    height: '12px',
    border: [[1, 'solid', comet]],
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1
  },
  notificationTitle: {
    margin: 0,
    color: comet
  },
  notificationBody: {
    margin: 0
  },
  notificationSubtitle: {
    margin: 0,
    marginBottom: spacer,
    color: comet
  },
  stripes: {
    position: 'absolute',
    height: '100%',
    top: '0px',
    opacity: '60%'
  },
  hasUnread: {
    position: 'absolute',
    top: 0,
    left: 16,
    width: '9px',
    height: '9px',
    backgroundColor: secondaryColor,
    borderRadius: '50%'
  }
}

export default styles
