
import'./style.scss'
const BaseComponent = () => {
  return (
    <div className="contentlow">
    <p className="left">5 items left</p>
    <div className="choices">
      <p className="active">All</p>
      <p>Active</p>
      <p>Completed</p>
    </div>
    <p className="clear">Clear Completed</p>
  </div>
  )
}

export default BaseComponent