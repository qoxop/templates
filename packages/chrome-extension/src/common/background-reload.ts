if (__LIVE_RELOAD__) {
  try {
    const socket = new WebSocket("ws://localhost:8080/wss");
    socket.onmessage = async function (event) {
      if (event.data.toString() === 'reload') {
        chrome.runtime.reload();
      }
    };
  } catch (error) {
    console.log(error)
  }
}