const PushNotification = require('push-notification');


const fcm = new PushNotification({
  gcm: {
    id: 'project-id',
    key: 'gcm-api-key',
  },
});


const deviceToken = 'device-token';




fcm.send(deviceToken, {title,body}, (err, result) => {
  if (err) {
    console.error('Error sending notification:', err);
  } else {
    console.log('Notification sent successfully:', result);
  }
});
