if (process.env.NODE_ENV === 'development') {
  const socket = new WebSocket("ws://127.0.0.1:8080");
  socket.onmessage = async function (event) {
    if (event.data.toString() === 'reload') {
      setTimeout(() => {
        window.location.reload()
      }, 200);
    }
  };
}
console.log('content script');
