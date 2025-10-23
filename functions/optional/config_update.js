// Update settings without restarting the SDK
n9s("config", {
  debug: true, // enable debugging
  analytics_batch_size: 5, // reduce batch size
  ws_reconnect_max_attempts: 3, // fewer reconnection attempts
});
