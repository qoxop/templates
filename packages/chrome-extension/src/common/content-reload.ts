if (__LIVE_RELOAD__) {
    const socket = new WebSocket("ws://localhost:8080/wss");
    socket.onmessage = async function (event) {
      if (event.data.toString() === 'reload') {
        setTimeout(() => {
          window.location.reload()
        }, 200);
      }
    };
  }