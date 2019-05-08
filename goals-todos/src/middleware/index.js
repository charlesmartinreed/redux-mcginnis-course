import { applyMiddleware } from "redux";

import logger from "./logger";
import checker from "./checker";
import thunk from "redux-thunk";

export default applyMiddleware(thunk, checker, logger);
