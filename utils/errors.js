// Client errors
const BAD_REQUEST = 400; // Invalid data or invalid ID
const NOT_FOUND = 404; // Resource not found (user/item/address)

// Server errors
const INTERNAL_SERVER_ERROR = 500; // Default server error

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
};
