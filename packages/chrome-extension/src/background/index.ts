if (process.env.NODE_ENV === 'development') {
    let socket = new WebSocket("ws://127.0.0.1:8080");
    socket.onmessage = async function (event) {
      if (event.data.toString() === 'reload') {
        chrome.runtime.reload();
      }
    };
  }
  
  console.log('background script')