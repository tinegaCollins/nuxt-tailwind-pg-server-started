export default defineEventHandler((event) => {
  const requestURL = getRequestURL(event);
  const requestMethod = event.node.req.method;

  if (requestURL.href.includes("localhost")) {
    console.log(`Request Type: ${requestMethod}, URL: ${requestURL.href}`);
  }
});
