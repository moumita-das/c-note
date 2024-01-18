export function getError(error) {
  if (error.response && error.response.data.desc) {
    return error.response.data.desc;
  }
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else {
    return error.message;
  }
}
