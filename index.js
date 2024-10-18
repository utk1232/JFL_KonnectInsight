const express = require("express");
const session = require("express-session");

const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const APP_PORT = process.env.PORT || 3000;
const server = require("http").createServer(app);
const axios = require("axios");
const FormData = require("form-data");
const cors = require("cors");

// Initialize CORS Policy
app.use(cors());
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   }) // Set to true if using HTTPS
// );

const email = "pranshu.rastogi@jublfood.com";
const password = "JfLUaTZenD#0187";

let generatedOTP = ""; // Variable to store the generated OTP
const CUSTOMRECORDID = "01HTM0D8FHVMPRCT0VNAWQQ00K";
let clientToken = "";
app.post("/logout", (req, res) => {
  generatedOTP = "";
  clientToken = "";
  res.status(200).send("Logged out");
});

function isLoggedOut(req, res, next) {
  console.log("isloggedout", generatedOTP);
  if (generatedOTP === "") {
    console.log("redirecting to home");
    res.redirect("/home");
  }
  next();
}

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

function requestOTP() {
  generatedOTP = generateOTP();
  console.log("Generated OTP:", generatedOTP);
}

async function setToken() {
  const token = Buffer.from(`${email}:${password}`).toString("base64");
  const config = {
    url: `https://jubilantfoodworks71341691410187.zendesk.com/api/v2/custom_objects/token/records/${CUSTOMRECORDID}`,
    type: "GET",
    contentType: "application/json",
  };

  try {
    // Step 1: Fetch the token
    let response = await fetch(config.url, {
      method: config.type,
      headers: {
        "Content-Type": config.contentType,
        Authorization: `Basic ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    clientToken = data.custom_object_record.custom_object_fields.new_token;
    return data.custom_object_record.custom_object_fields.new_token;
  } catch (error) {
    console.error("Error getting token", error);
  }
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,DELETE,POST");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/pages/routes"));

app.use("/feedBack", async (req, res) => {
  if (req.body.orderTypeCheckBox === "Offline") {
    res.render("offline");
  } else {
    res.render("online");
  }
});

app.post("/welcome", isLoggedOut, (req, res) => {
  console.log(req.body, "welcome req body");
  let empName = req.body.empName;
  const otp = [
    req.body.first,
    req.body.second,
    req.body.third,
    req.body.fourth,
    req.body.fifth,
    req.body.sixth,
  ].join("");

  console.log(`Received OTP: ${otp}`);
  console.log(otp, "otpname");
  if (otp === generatedOTP) {
    res.render("welcome", { empName });
  } else {
    res.render("otp", { error: "Invalid OTP. Please try again." });
  }
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/otp", async (req, res) => {
  console.log("otp function running");
  const employeeCode = req.body.employeeCode;
  console.log(employeeCode, "employee of the code");
  let tokenResponse;
  try {
    // Step 1: Fetch the token
    tokenResponse = await fetch(
      "https://jfl-apihub.fx-prod-apps.jublfood.com/api/Authenticate/Auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: "JFLUser",
          Password: "EmpPass$@#120884$01",
        }),
      }
    );
  } catch (error) {
    console.error("Error to fetching employee data", error);
    res.status(500).send("Error fetching employee data");
  }

  if (!tokenResponse.ok) {
    throw new Error("Failed to fetch token");
  }

  const tokenData = await tokenResponse.json();
  const token = tokenData.token;
  console.log(tokenData, "tokenData");
  let response;
  let url = `https://jfl-apihub.fx-prod-apps.jublfood.com/api/employee/findbycode?code=${employeeCode}&email=&mobile=&token=${token}`;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const empName = data.employeeName;
    console.log(data, "respones of get in otp", url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    //console.log(data, "utkarsh");

    // res.render('employeeDetails', { employeeData: data });
    res.render("otp", { empName });
  } catch (error) {
    console.error("Error to fetching employee data", error);
    res.status(500).send("Error fetching employee data");
  }
  requestOTP();
  //${data.mobileNo}
  let otpApi = `https://pod5-japi.instaalerts.zone/httpapi/QueryStringReceiver?ver=1.0&key=2D1WT91EvQmCU2f6F3c0Rw%3D%3D&dest=917827070422&send=JFLHRS%20&dlt_entity_id=1101410920000025273&text=Dear%20User%2C%20Your%20Helpdesk%20Login%20OTP%20is%20${generatedOTP}.%20Thank%20you%2C%20Jubilant%20FoodWorks.&dlt_template_id=1107168905125262682`;

  const otpResponse = await fetch(otpApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!otpResponse.ok) {
    throw new Error("Failed to send OTP");
  }
});

app.use("/orderlist", isLoggedOut, async (req, res) => {
  //console.log(req.body, "req.body for orderlist");
  const phoneNumber = req.body.phoneNumber;
  const empName = req.body.empName;

  try {
    if (!phoneNumber) {
      //console.log(req.body, "req.body for orderlist not phonenumber");
      return res.status(400).send("Phone number is required.");
    }
    //console.log(req.body, "req.body for orderlist");
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `https://retail-s1-ext.jfltechlabs.com/order360/order-service/orders/?page=0&pageSize=10&mobile=${phoneNumber}&tenant=DOM-IN`,
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data, "res in orderlist"));
        res.render("orderlist", { orders: response.data, empName });
      })
      .catch((error) => {
        //  console.log(error, "error fetching orders");
        res.status(500).send("Error fetching orders");
      });
  } catch (error) {
    //  console.log(error, "error for orderlist");
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
});

app.use("/selected-details", async (req, res) => {
  res.render("selected-details");
});

// app.post("/feedbackCategory", (req, res) => {
//   console.log(req, "request in post feedbackCategory");
//   res.render("feedbackCategory");
// });

app.use("/the4Pizza2", async (req, res) => {
  res.render("the4Pizza2");
});

app.use("/refund", async (req, res) => {
  res.render("refund");
});

app.use("/requestResolved", isLoggedOut, async (req, res) => {
  console.log("request resolved running");
  res.render("requestResolved");
});

app.use("/submitForm", async (req, res) => {
  res.render("submitForm");
});

app.use("/the4CheesePizza", isLoggedOut, async (req, res) => {
  console.log(req, "req in cheese4pizza");
  let token = await setToken();
  let response;
  // token = token.json();
  console.log(token, "token in the4cheezepizza");
  try {
    response = await axios.get(
      "https://ext-s2-labs.dominosindia.in/ucr-api/api/v2/getIssueCategories",
      {
        headers: {
          source: "PWA18",
          apikey: "T56HFR3J2V",
          client_token: `${token}`,
        },
      }
    );

    const orderDetails = req.body.orderDetails || null;
    const empName = req.body.empName || null;
    const orders = response.data.data.groups;
    console.log(orderDetails, "data in req in the4cheesepizza");
    res.render("the4CheesePizza", { orders, orderDetails, empName });
  } catch (error) {
    console.error("Error making API request:", error.message);
    res.render("the4CheesePizza", { orders: [], orderDetails: null, empName });
  }

  // const response = {
  //   data: {
  //     groups: [
  //       {
  //         id: 1,
  //         name: "productQuality",
  //         displayText: "Product Quality",
  //         categories: [
  //           {
  //             id: 20,
  //             name: "productQuality",
  //             displayText: "Product Quality",
  //             isSingleValue: 0,
  //             subCategories: [
  //               {
  //                 id: 31,
  //                 displayText: "Cheese & Topping",
  //                 isFtr: false,
  //                 reasonId: 603,
  //               },
  //               {
  //                 id: 32,
  //                 displayText: "Cold Product Received",
  //                 isFtr: false,
  //                 reasonId: 600,
  //               },
  //               {
  //                 id: 33,
  //                 displayText: "Taste",
  //                 isFtr: false,
  //                 reasonId: 602,
  //               },
  //               {
  //                 id: 34,
  //                 displayText: "Veg/Non-Veg",
  //                 isFtr: false,
  //                 reasonId: 601,
  //               },
  //             ],
  //           },
  //           {
  //             id: 42,
  //             name: "foreignParticle",
  //             displayText: "Foreign Particles",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 89,
  //                 displayText: "Hair in Product",
  //                 isFtr: false,
  //                 reasonId: 620,
  //               },
  //               {
  //                 id: 90,
  //                 displayText: "Other particle",
  //                 isFtr: false,
  //                 reasonId: 621,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         name: "serviceIssues",
  //         displayText: "Service Issues",
  //         categories: [
  //           {
  //             id: 21,
  //             name: "orderDelay",
  //             displayText: "Late Order",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 35,
  //                 displayText: "Delivery Pending",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 36,
  //                 displayText: "Order Delivered Late",
  //                 isFtr: true,
  //                 reasonId: 601,
  //               },
  //             ],
  //           },
  //           {
  //             id: 23,
  //             name: "staffBehaviour",
  //             displayText: "Staff Behaviour",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 47,
  //                 displayText: "Rude Behaviour",
  //                 isFtr: false,
  //                 reasonId: 623,
  //               },
  //               {
  //                 id: 48,
  //                 displayText: "Staff Knowledge",
  //                 isFtr: false,
  //                 reasonId: 624,
  //               },
  //               {
  //                 id: 49,
  //                 displayText: "Staff Not Supportive",
  //                 isFtr: false,
  //                 reasonId: 625,
  //               },
  //             ],
  //           },
  //           {
  //             id: 24,
  //             name: "incompleteWrong",
  //             displayText: "Wrong Order Delivered",
  //             isSingleValue: 0,
  //             subCategories: [
  //               {
  //                 id: 50,
  //                 displayText: "Incomplete Order Delivered",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 51,
  //                 displayText: "Wrong Order Delivered",
  //                 isFtr: false,
  //                 reasonId: 622,
  //               },
  //             ],
  //           },
  //           {
  //             id: 43,
  //             name: "orderCancelled",
  //             displayText: "Order Cancelled",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 91,
  //                 displayText: "Restaurant cancelled Order",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 92,
  //                 displayText: "My order not cancelled by the restaurant",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         name: "paymentsOrRefunds",
  //         displayText: "Payment or Refunds",
  //         categories: [
  //           {
  //             id: 26,
  //             name: "refundRelated",
  //             displayText: "Refund Issues",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 291,
  //                 displayText: "Order Failed - Refund Pending",
  //                 isFtr: true,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 292,
  //                 displayText: "Order Cancelled - Refund Pending",
  //                 isFtr: true,
  //                 reasonId: null,
  //               },
  //             ],
  //           },
  //           {
  //             id: 28,
  //             name: "couponEvoucher",
  //             displayText: "Coupon or E-Voucher",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 57,
  //                 displayText: "Coupon",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 58,
  //                 displayText: "E-Voucher",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         id: 4,
  //         name: "others",
  //         displayText: "Others",
  //         categories: [
  //           {
  //             id: 37,
  //             name: "duplicateBill",
  //             displayText: "Duplicate Bill",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 66,
  //                 displayText: "Duplicate Bill",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //             ],
  //           },
  //           {
  //             id: 41,
  //             name: "appreciation",
  //             displayText: "Give Appreciation",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 71,
  //                 displayText: "Digital Experience",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 85,
  //                 displayText: "Product",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 86,
  //                 displayText: "Employee",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 87,
  //                 displayText: "Brand",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //             ],
  //           },
  //           {
  //             id: 73,
  //             name: "restaurantFeedback",
  //             displayText: "Restaurant Feedback",
  //             isSingleValue: 1,
  //             subCategories: [
  //               {
  //                 id: 293,
  //                 displayText: "Ambience",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //               {
  //                 id: 294,
  //                 displayText: "Hygiene",
  //                 isFtr: false,
  //                 reasonId: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // };
  // console.log(response.data.groups, "feedback");
  // const orders = response.data.groups;
  // res.render("the4CheesePizza", { orders });
});

app.use("/orderSelection", async (req, res) => {
  // try {
  //   // const response = await axios.get('https://ext-s2-labs.dominosindia.in/ucr-api/api/v2/getIssueCategories', {
  //   //   headers: {
  //   //     source: 'ZENDESK',
  //   //     apikey: 'T56HFR3J2V',
  //   //     client_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJUT0tFTl9UWVBFIjoiQVVUSCIsInNlc3Npb25fSWQiOiI5NTM0MDFlZi01NjZjLTRjMDUtYmZiMC05YWRiYzIwYjA5NWMiLCJleHAiOjE3MTg4NzAzNjJ9.a15nTXBNgyhcTH1ts4ZANrQlPlRnsoisUpyPCB2Oz-4',
  //   //   },
  //   // });
  //   // console.log(response.data.data.groups, "feedback");

  //   const orders = response.data.data.groups; // Adjust this based on the actual structure of your response data
  //   res.render('the4CheesePizza', { orders });

  // } catch (error) {
  //   console.error('Error making API request:', error.message);
  //   res.render('the4CheesePizza', { orders: [] }); // Adjust to render the correct template
  // }

  const response = {
    data: {
      groups: [
        {
          id: 1,
          name: "productQuality",
          displayText: "Product Quality",
          categories: [
            {
              id: 20,
              name: "productQuality",
              displayText: "Product Quality",
              isSingleValue: 0,
              subCategories: [
                {
                  id: 31,
                  displayText: "Cheese & Topping",
                  isFtr: false,
                  reasonId: 603,
                },
                {
                  id: 32,
                  displayText: "Cold Product Received",
                  isFtr: false,
                  reasonId: 600,
                },
                {
                  id: 33,
                  displayText: "Taste",
                  isFtr: false,
                  reasonId: 602,
                },
                {
                  id: 34,
                  displayText: "Veg/Non-Veg",
                  isFtr: false,
                  reasonId: 601,
                },
              ],
            },
            {
              id: 42,
              name: "foreignParticle",
              displayText: "Foreign Particles",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 89,
                  displayText: "Hair in Product",
                  isFtr: false,
                  reasonId: 620,
                },
                {
                  id: 90,
                  displayText: "Other particle",
                  isFtr: false,
                  reasonId: 621,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "serviceIssues",
          displayText: "Service Issues",
          categories: [
            {
              id: 21,
              name: "orderDelay",
              displayText: "Late Order",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 35,
                  displayText: "Delivery Pending",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 36,
                  displayText: "Order Delivered Late",
                  isFtr: true,
                  reasonId: 601,
                },
              ],
            },
            {
              id: 23,
              name: "staffBehaviour",
              displayText: "Staff Behaviour",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 47,
                  displayText: "Rude Behaviour",
                  isFtr: false,
                  reasonId: 623,
                },
                {
                  id: 48,
                  displayText: "Staff Knowledge",
                  isFtr: false,
                  reasonId: 624,
                },
                {
                  id: 49,
                  displayText: "Staff Not Supportive",
                  isFtr: false,
                  reasonId: 625,
                },
              ],
            },
            {
              id: 24,
              name: "incompleteWrong",
              displayText: "Wrong Order Delivered",
              isSingleValue: 0,
              subCategories: [
                {
                  id: 50,
                  displayText: "Incomplete Order Delivered",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 51,
                  displayText: "Wrong Order Delivered",
                  isFtr: false,
                  reasonId: 622,
                },
              ],
            },
            {
              id: 43,
              name: "orderCancelled",
              displayText: "Order Cancelled",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 91,
                  displayText: "Restaurant cancelled Order",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 92,
                  displayText: "My order not cancelled by the restaurant",
                  isFtr: false,
                  reasonId: null,
                },
              ],
            },
          ],
        },
        {
          id: 3,
          name: "paymentsOrRefunds",
          displayText: "Payment or Refunds",
          categories: [
            {
              id: 26,
              name: "refundRelated",
              displayText: "Refund Issues",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 291,
                  displayText: "Order Failed - Refund Pending",
                  isFtr: true,
                  reasonId: null,
                },
                {
                  id: 292,
                  displayText: "Order Cancelled - Refund Pending",
                  isFtr: true,
                  reasonId: null,
                },
              ],
            },
            {
              id: 28,
              name: "couponEvoucher",
              displayText: "Coupon or E-Voucher",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 57,
                  displayText: "Coupon",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 58,
                  displayText: "E-Voucher",
                  isFtr: false,
                  reasonId: null,
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: "others",
          displayText: "Others",
          categories: [
            {
              id: 37,
              name: "duplicateBill",
              displayText: "Duplicate Bill",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 66,
                  displayText: "Duplicate Bill",
                  isFtr: false,
                  reasonId: null,
                },
              ],
            },
            {
              id: 41,
              name: "appreciation",
              displayText: "Give Appreciation",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 71,
                  displayText: "Digital Experience",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 85,
                  displayText: "Product",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 86,
                  displayText: "Employee",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 87,
                  displayText: "Brand",
                  isFtr: false,
                  reasonId: null,
                },
              ],
            },
            {
              id: 73,
              name: "restaurantFeedback",
              displayText: "Restaurant Feedback",
              isSingleValue: 1,
              subCategories: [
                {
                  id: 293,
                  displayText: "Ambience",
                  isFtr: false,
                  reasonId: null,
                },
                {
                  id: 294,
                  displayText: "Hygiene",
                  isFtr: false,
                  reasonId: null,
                },
              ],
            },
          ],
        },
      ],
    },
  };
  // console.log(response.data.groups, "feedback");
  const orders = response.data.groups;
  res.render("orderSelection", { orders });
});

app.use("/feedbackCategory", isLoggedOut, async (req, res) => {
  console.log(req.body, "request in use feedbackCategory");
  //const orderDetails = req.body.orderDetails;
  const { orderDetails, selectedCategory, selectedSubcategory } = req.body;
  // const orderDetails = JSON.parse(sessionStorage.getItem("orderDetails"));
  console.log("Order Details:", orderDetails);
  console.log("Selected Category:", selectedCategory);
  console.log("Selected Subcategory:", selectedSubcategory);
  let orderCity =
    orderDetails?.deliveryAddress?.city || orderDetails?.store?.city;

  const comments = req.body.comments;
  console.log(comments, "comments in feedbackcategory");
  const orderDate = Math.floor(orderDetails.orderTimeStamp / 1000);

  if (orderDetails) {
    let body = {
      title: "Mr.",
      firstName: `${orderDetails.userDetails.firstName}`,
      secondName: `${orderDetails.userDetails.lastName}`,
      orderDate: `${orderDate}`,
      orderNumber: `${orderDetails.orderNumber}`,
      mobileNumber: `${orderDetails.userDetails.mobile}`,
      orderCity: `${orderCity}`,
      email: `${orderDetails.userDetails.email}`,
      storeCode: `${orderDetails.store.id}`,
      comments: "test test",
      category: `${selectedCategory}`,
      subcategories: `${selectedSubcategory}`,
      // category: `${selectedCategory}`,
      // subcategories: `${selectedSubcategory}`,
    };

    console.log(body, "feedbackcategory body");
    let response;
    try {
      response = await fetch(
        "https://ext-s2-labs.dominosindia.in/ucr-api/api/v2/feedbacks",
        {
          method: "POST",
          headers: {
            api_key: "T56HFR3J2V",
            client_token: `${clientToken}`, // Make sure to replace this with the actual token
            client_type: "mobile-android-8.0.0",
            source: "PWA18",
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      if (response.ok) {
        console.log("Feedback submitted successfully");
        res.render("feedbackCategory");
      } else {
        console.error("Error submitting feedback:", response.statusText);
        res.status(response.status).send("Error submitting feedback");
      }
    } catch (error) {
      console.error("Network error:", error);
      res.status(500).send("Network error occurred");
    }
  } else {
    console.log("No comments provided. Feedback submission skipped.");
    res.render("feedbackCategory", { orderDetails });
  }
});

async function apiCall(
  title,
  firstName,
  lastName,
  PhoneNumber,
  EMail,
  ResidenceCity,
  RestaurantCity,
  RestaurantAddress,
  OrderSource,
  FeedbackType,
  imgUploadTokenId
) {
  let data = JSON.stringify({
    ticket: {
      subject: "Test",
      comment: {
        body: "Test",
        uploads: [imgUploadTokenId],
      },
      custom_fields: [
        {
          id: 12191900966813,
          value: ResidenceCity,
        },
        {
          id: 12191939531293,
          value: RestaurantCity,
        },
        {
          id: 12191997229085,
          value: RestaurantAddress,
        },
        {
          id: 12192015437725,
          value: OrderSource,
        },
        {
          id: 12192038955293,
          value: FeedbackType,
        },
      ],
    },
  });
  try {
    var config = {
      method: "POST",
      url: "https://saroj5089.zendesk.com/api/v2/tickets.json",
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "sarojacharya6694@gmail.com",
        password: "Test@1234",
      },
      data: data,
    };
    try {
      const response = await axios(config);
      console.log("Response", response.data);
      return true;
    } catch (error) {
      console.log("errorData", error);
    }
  } catch (error) {
    return error.response;
  }
}
server.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
