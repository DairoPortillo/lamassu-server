import { makeStyles } from '@material-ui/core'
import React from 'react'
import { H1, P, Info2 } from 'src/components/typography'
import TxOutIcon from 'src/styling/icons/direction/cash-out.svg?react'

import { Button } from 'src/components/buttons'
import { neon, spacer } from 'src/styling/variables'

const styles = {
  logo: {
    maxHeight: 80,
    maxWidth: 200
  },
  subtitle: {
    margin: 0,
    marginBottom: 42,
    textAlign: 'center'
  },
  text: {
    margin: 0
  },
  button: {
    margin: [[0, 'auto']]
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: [[0, 34, 107, 34]]
  },
  innerContent: {
    paddingBottom: 72
  },
  title: {
    color: neon,
    marginBottom: 12,
    marginTop: 30,
    textAlign: 'center'
  },
  titleDecorator: {
    verticalAlign: 'bottom',
    marginRight: spacer * 1.5,
    width: spacer * 3,
    height: spacer * 3.25
  }
}

const useStyles = makeStyles(styles)

const WizardSplash = ({ name, onContinue }) => {
  const classes = useStyles()

  return (
    <div className={classes.modalContent}>
      <div className={classes.innerContent}>
        <H1 className={classes.title}>
          <TxOutIcon className={classes.titleDecorator} />
          <span>Enable cash-out</span>
        </H1>
        <Info2 className={classes.subtitle}>{name}</Info2>
        <P>
          You are about to activate cash-out functionality on your {name}{' '}
          machine which will allow your customers to sell crypto to you.
        </P>
        <P>
          In order to activate cash-out for this machine, please enter the
          denominations for the machine.
        </P>
      </div>
      <Button className={classes.button} onClick={onContinue}>
        Start configuration
      </Button>
    </div>
  )
}

export default WizardSplash
