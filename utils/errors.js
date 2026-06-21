// Client errors
const BAD_REQUEST = 400; // Invalid data or invalid ID
const NOT_FOUND = 404; // Resource not found (user/item/address)
// Conflict errors
const CONFLICT = 409; // Duplicate email or other unique constraint violation
// 401 error constants
const UNAUTHORIZED = 401; // Authentication required or failed
// Server errors
const INTERNAL_SERVER_ERROR = 500; // Default server error
const FORBIDDEN = 403; // Forbidden action

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,CONFLICT,UNAUTHORIZED,
  FORBIDDEN,
};

