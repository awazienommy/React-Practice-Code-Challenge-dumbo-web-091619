import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  const transformedArray = props.renderedSushis.map((sushi) => {
    return(<Sushi changeEaten={props.changeEaten} sushi={sushi} key={sushi.id} />)
  })
  return (
    <Fragment>
      <div className="belt">
        {
          transformedArray
        }
        <MoreButton sendSushis={props.sendSushis} />
      </div>
    </Fragment>
  )
}

export default SushiContainer