import { makeStyles } from '@material-ui/core'
import classnames from 'classnames'
import React from 'react'
import {
  Table,
  THead,
  TBody,
  Td,
  Th,
  Tr
} from 'src/components/fake-table/Table'
import EditIcon from 'src/styling/icons/action/edit/white.svg?react'

import { IconButton } from 'src/components/buttons'

import styles from './SingleRowTable.styles'

const useStyles = makeStyles(styles)

const SingleRowTable = ({
  width = 378,
  height = 128,
  title,
  items,
  onEdit,
  className
}) => {
  const classes = useStyles({ width, height })

  return (
    <>
      <Table className={classnames(className, classes.table)}>
        <THead>
          <Th className={classes.head}>
            {title}
            <IconButton onClick={onEdit} className={classes.button}>
              <EditIcon />
            </IconButton>
          </Th>
        </THead>
        <TBody>
          <Tr className={classes.tr}>
            <Td width={width}>
              {items && (
                <>
                  {items[0] && (
                    <div className={classes.itemWrapper}>
                      <div className={classes.label}>{items[0].label}</div>
                      <div className={classes.item}>{items[0].value}</div>
                    </div>
                  )}
                  {items[1] && (
                    <div className={classes.itemWrapper}>
                      <div className={classes.label}>{items[1].label}</div>
                      <div className={classes.item}>{items[1].value}</div>
                    </div>
                  )}
                </>
              )}
            </Td>
          </Tr>
        </TBody>
      </Table>
    </>
  )
}

export default SingleRowTable
