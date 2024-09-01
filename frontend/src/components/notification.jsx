const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const [text, color] = message
  const nstyle = {
    color: 'white',
    background: color,
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div className={'notif'} style={nstyle}>
      {text}
    </div>
  )
}

export default Notification
