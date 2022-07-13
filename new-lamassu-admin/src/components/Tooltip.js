import { makeStyles, ClickAwayListener } from '@material-ui/core'
import * as R from 'ramda'
import React, { useState, memo } from 'react'

import Popper from 'src/components/Popper'
import { ReactComponent as HelpIcon } from 'src/styling/icons/action/help/zodiac.svg'

const useStyles = makeStyles({
  transparentButton: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer',
    marginTop: 4
  },
  popoverContent: ({ width }) => ({
    width,
    padding: [[10, 15]]
  })
})

const usePopperHandler = width => {
  const classes = useStyles({ width })
  const [helpPopperAnchorEl, setHelpPopperAnchorEl] = useState(null)

  const handleOpenHelpPopper = event => {
    setHelpPopperAnchorEl(helpPopperAnchorEl ? null : event.currentTarget)
  }

  const handleCloseHelpPopper = () => {
    setHelpPopperAnchorEl(null)
  }

  const helpPopperOpen = Boolean(helpPopperAnchorEl)

  return {
    classes,
    helpPopperAnchorEl,
    helpPopperOpen,
    handleOpenHelpPopper,
    handleCloseHelpPopper
  }
}

const useHoverablePopperHandler = width => {
  const classes = useStyles({ width })
  const [helpPopperAnchorEl, setHelpPopperAnchorEl] = useState(null)

  const handleOpenHelpPopper = event => {
    const boundingRect = event.currentTarget.getBoundingClientRect()

    if (
      event.pageX < boundingRect.left + window.scrollX + 2 ||
      event.pageX >
        boundingRect.left + window.scrollX + boundingRect.width - 2 ||
      event.pageY < boundingRect.top + window.scrollY + 2 ||
      event.pageY > boundingRect.top + window.scrollY + boundingRect.height - 2
    ) {
      return handleCloseHelpPopper()
    }

    setHelpPopperAnchorEl(event.currentTarget)
  }

  const handleCloseHelpPopper = () => {
    setHelpPopperAnchorEl(null)
  }

  const helpPopperOpen = Boolean(helpPopperAnchorEl)

  return {
    classes,
    helpPopperAnchorEl,
    helpPopperOpen,
    handleOpenHelpPopper,
    handleCloseHelpPopper
  }
}

const Tooltip = memo(({ children, width, Icon = HelpIcon }) => {
  const handler = usePopperHandler(width)

  return (
    <ClickAwayListener onClickAway={handler.handleCloseHelpPopper}>
      <div>
        <button
          type="button"
          className={handler.classes.transparentButton}
          onClick={handler.handleOpenHelpPopper}>
          <Icon />
        </button>
        <Popper
          open={handler.helpPopperOpen}
          anchorEl={handler.helpPopperAnchorEl}
          placement="bottom">
          <div className={handler.classes.popoverContent}>{children}</div>
        </Popper>
      </div>
    </ClickAwayListener>
  )
})

const HoverableTooltip = memo(
  ({ parentElements, children, width, placement }) => {
    const handler = useHoverablePopperHandler(width)

    return (
      <div>
        {!R.isNil(parentElements) && (
          <div
            onMouseEnter={handler.handleOpenHelpPopper}
            onMouseMove={handler.handleOpenHelpPopper}>
            {parentElements}
          </div>
        )}
        {R.isNil(parentElements) && (
          <button
            type="button"
            onMouseEnter={handler.handleOpenHelpPopper}
            onMouseLeave={handler.handleCloseHelpPopper}
            className={handler.classes.transparentButton}>
            <HelpIcon />
          </button>
        )}
        <Popper
          open={handler.helpPopperOpen}
          anchorEl={handler.helpPopperAnchorEl}
          placement={placement ?? 'bottom'}
          arrowEnabled={false}
          modifiers={{
            offset: {
              enabled: true,
              offset: '0, 10'
            }
          }}>
          <div className={handler.classes.popoverContent}>{children}</div>
        </Popper>
      </div>
    )
  }
)

export { Tooltip, HoverableTooltip }
