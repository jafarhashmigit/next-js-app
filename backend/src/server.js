// these are express setting set
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const session = require("express-session");
app.use(session({ secret: "SECRET", resave: false, saveUninitialized: false }));
app.use(passport.initialize());

app.use(cors());

global.messages = require("../config/messages");
global.dataConstraint = require("../config/data_constraints");


require("./middleware");
require("./services");
require("./modules");
require("../config/strategies");

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  next(createError(404));
});




// error handler on next(err)
app.use((err, req, res, next)=>{
  res
    .status(err.status || 500)
    .send({ status: err.status, message: err.message, data: {} });
});
