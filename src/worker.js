onmessage = event => {
  console.log(event.data);

  postMessage(event.data);
};
