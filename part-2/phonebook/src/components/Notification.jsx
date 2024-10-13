const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  } else {
    return <div className={notification.className}>{notification.message}</div>;
  }
};

export default Notification;
