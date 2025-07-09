const Notification = ({ type, message }) => {
    if (message === null || type === null) {
      return null
    }
    console.log('Notification type', type, 'message', message)
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }
  
  export default Notification