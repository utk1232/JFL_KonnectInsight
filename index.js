const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const APP_PORT = process.env.PORT || 3000;
const server = require("http").createServer(app);
const axios = require("axios");
const FormData = require("form-data");
const cors = require('cors');


// Initialize CORS Policy
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,POST');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());

app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

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

app.use("/welcome", async (req, res) => {
    res.render('welcome');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.post("/otp", async (req, res) => {
    const employeeCode = req.body.employeeCode;
    console.log(employeeCode, "employee of the code")

    try {
        const response = await fetch(`https://jfl-apihub.fx-prod-apps.jublfood.com/api/employee/findbycode?code=${employeeCode}&email=&mobile=`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKRkxVc2VyIiwianRpIjoiYmUxYWI0MGItNzYxOS00MWQ0LWFjZWQtYzU2ZWI4MjAwMTBkIiwiZXhwIjoxNzI3Mjg4NzYzLCJpc3MiOiJKRkwiLCJhdWQiOiJFbXBNYXN0ZXIifQ.lhOI9znyum_WSVbnNMYvjYy0jyykZp6PnZ558SLCCF8'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        // res.render('employeeDetails', { employeeData: data });
        res.render('/otp')
    }
    catch (error) {
        console.error("Error to fetching employee data",error);
        res.status(500).send("Error fetching employee data");
    }
});


app.post("/orderlist", async (req, res) => {
    // const axios = require('axios');

    // const phoneNumber = req.body.phoneNumber;
    // let config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: `https://retail-s1-ext.jfltechlabs.com/order360/order-service/orders/?page=1&pageSize=10&mobile=${phoneNumber}&tenant=DOM-IN`,
    //     headers: {}
    // };
    // axios.request(config)
    //     .then((response) => {

    //         console.log(JSON.stringify(response.data));

    //         const orders = response.data.orders;            
    //         res.render('orderlist', { orders });
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         res.status(500).send("Error fetching orders");
    //     });
    const response =
    {
        "status": "SUCCESS",
        "filter": [
            {
                "filterKey": "orderType",
                "filterValue": "All",
                "displayText": "All"
            },
            {
                "filterKey": "orderType",
                "filterValue": "D",
                "displayText": "Delivery"
            },
            {
                "filterKey": "orderType",
                "filterValue": "DINEIN",
                "displayText": "Dine-In"
            },
            {
                "filterKey": "orderType",
                "filterValue": "TAKEAWAY",
                "displayText": "Takeaway"
            },
            {
                "filterKey": "orderType",
                "filterValue": "CURB",
                "displayText": "Drive-n-Pick"
            },
            {
                "filterKey": "orderType",
                "filterValue": "IRCTC",
                "displayText": "IRCTC"
            }
        ],
        "orders": [
            {
                "id": "66879f5236fb095a07978e82",
                "orderId": "DPI6585R202407055547",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_DELIVERED",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720164172850,
                "punchTimeStamp": 1720164172850,
                "deliveryTimeStamp": 1720170956000,
                "price": 707.52,
                "tax": 35.3762,
                "charges": null,
                "discount": 0,
                "netPrice": 743,
                "finalPrice": 742.9,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 707.52,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 35.3762,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 17.6881,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 17.6881,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 742.8962,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031436",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "123",
                    "customers_mobile": "9599903137",
                    "street_name": "4",
                    "area_level0": "Bhalswa Lake, Jahangirpura, Delhi, 110042",
                    "city_region": null,
                    "area_level2": "",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "_SV-Margherita",
                            "description": "_SV-Margherita",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0117",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 11.95,
                        "pricePerQty": 239,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 11.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    },
                    {
                        "itemId": null,
                        "product": {
                            "name": "VG2-1Peppy Paneer",
                            "description": "VG2-1Peppy Paneer",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0120",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 22.95,
                        "pricePerQty": 459,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 22.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 20,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "6687ba3436fb095a07978e93",
                "orderId": "DPI6585R202407055564",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_CREATED",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720171053233,
                "punchTimeStamp": 1720171053233,
                "deliveryTimeStamp": null,
                "price": 248.52,
                "tax": 12.4262,
                "charges": null,
                "discount": 0,
                "netPrice": 261,
                "finalPrice": 260.95,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 248.52,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 12.4262,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 6.2131,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 6.2131,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 260.9462,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031469",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "123",
                    "customers_mobile": "9599903137",
                    "street_name": "4",
                    "area_level0": "Bhalswa Lake, Jahangirpura, Delhi, 110042",
                    "city_region": null,
                    "area_level2": "",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "_SV-Margherita",
                            "description": "_SV-Margherita",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0117",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 11.95,
                        "pricePerQty": 239,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 11.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 37,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "6687bac036fb095a07978e95",
                "orderId": "DPI6585R202407055566",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_PREPARING",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720171195740,
                "punchTimeStamp": 1720171195740,
                "deliveryTimeStamp": null,
                "price": 257.52,
                "tax": 12.8762,
                "charges": null,
                "discount": 0,
                "netPrice": 270,
                "finalPrice": 270.4,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 257.52,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 12.8762,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 6.4381,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 6.4381,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 270.3962,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031472",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "123",
                    "customers_mobile": "9599903137",
                    "street_name": "14",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "Bhalswa Dairy",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "DST- Chocolate lava Cake      ",
                            "description": "DST- Chocolate lava Cake      ",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "CAKE02",
                            "menuCat": "MCT0005",
                            "sizeCode": ".",
                            "fmcg": false
                        },
                        "productType": "DESSERTS",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 5.45,
                        "pricePerQty": 109,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 5.45,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": false
                    },
                    {
                        "itemId": null,
                        "product": {
                            "name": "Red velvet lava cake",
                            "description": "Red velvet lava cake",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "CAKE03",
                            "menuCat": "MCT0005",
                            "sizeCode": ".",
                            "fmcg": false
                        },
                        "productType": "DESSERTS",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 6.95,
                        "pricePerQty": 139,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 6.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": false
                    }
                ],
                "orderNumber": 39,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "6687bb0036fb095a07978e96",
                "orderId": "DPI6585R202407055567",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_DELIVERED",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720171258813,
                "punchTimeStamp": 1720171258813,
                "deliveryTimeStamp": 1720171381000,
                "price": 258.52,
                "tax": 12.9262,
                "charges": null,
                "discount": 0,
                "netPrice": 271,
                "finalPrice": 271.45,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 258.52,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 12.9262,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 6.4631,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 6.4631,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 271.4462,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031473",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "123",
                    "customers_mobile": "9599903137",
                    "street_name": "14",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "Bhalswa Dairy",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "Pepper BBQ Chicken",
                            "description": "Pepper BBQ Chicken",
                            "baked": true,
                            "foodType": "Non-Veg",
                            "menuCode": "PIZ5119",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT07",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 12.45,
                        "pricePerQty": 249,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 12.45,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 40,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "6687bb2836fb095a07978e97",
                "orderId": "DPI6585R202407055568",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_DELIVERED",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720171299067,
                "punchTimeStamp": 1720171299067,
                "deliveryTimeStamp": 1720171381000,
                "price": 608.52,
                "tax": 30.4262,
                "charges": null,
                "discount": 0,
                "netPrice": 639,
                "finalPrice": 638.95,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 608.52,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 30.4262,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 15.2131,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 15.2131,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 638.9462,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031474",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "123",
                    "customers_mobile": "9599903137",
                    "street_name": "14",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "Bhalswa Dairy",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "Chicken Dominator",
                            "description": "Chicken Dominator",
                            "baked": true,
                            "foodType": "Non-Veg",
                            "menuCode": "PIZ5124",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 29.95,
                        "pricePerQty": 599,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 29.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 41,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "6687bb5a36fb095a07978e98",
                "orderId": "DPI6585R202407055569",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_DELIVERED",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720171348893,
                "punchTimeStamp": 1720171348893,
                "deliveryTimeStamp": 1720171381000,
                "price": 468.52,
                "tax": 23.4262,
                "charges": null,
                "discount": 0,
                "netPrice": 492,
                "finalPrice": 491.95,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 468.52,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 23.4262,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 11.7131,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 11.7131,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 491.9462,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031475",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "123",
                    "customers_mobile": "9599903137",
                    "street_name": "14",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "Bhalswa Dairy",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "VG1-1Farmhouse",
                            "description": "VG1-1Farmhouse",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0119",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 22.95,
                        "pricePerQty": 459,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 22.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 42,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "668f63979232287484ce8a03",
                "orderId": "DPI6585R202407115709",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_OUT_FOR_DELIVERY",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720673168170,
                "punchTimeStamp": 1720673168170,
                "deliveryTimeStamp": null,
                "price": 239,
                "tax": 11.95,
                "charges": null,
                "discount": 0,
                "netPrice": 251,
                "finalPrice": 250.95,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 239,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 11.95,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 5.975,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 5.975,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 250.95,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031740",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "1",
                    "customers_mobile": "9599903137",
                    "street_name": "9",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "_SV-Margherita",
                            "description": "_SV-Margherita",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0117",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 11.95,
                        "pricePerQty": 239,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 11.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 1,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "668f63d89232287484ce8a04",
                "orderId": "DPI6585R202407115710",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_PREPARING",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720673234690,
                "punchTimeStamp": 1720673234690,
                "deliveryTimeStamp": null,
                "price": 459,
                "tax": 22.95,
                "charges": null,
                "discount": 0,
                "netPrice": 482,
                "finalPrice": 481.95,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 459,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 22.95,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 11.475,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 11.475,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 481.95,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031744",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "1",
                    "customers_mobile": "9599903137",
                    "street_name": "9",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "VG1-1Farmhouse",
                            "description": "VG1-1Farmhouse",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0119",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 22.95,
                        "pricePerQty": 459,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 22.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 2,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "668f645d9232287484ce8a05",
                "orderId": "DPI6585R202407115711",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_PREPARING",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720673366737,
                "punchTimeStamp": 1720673366737,
                "deliveryTimeStamp": null,
                "price": 459,
                "tax": 22.95,
                "charges": null,
                "discount": 0,
                "netPrice": 482,
                "finalPrice": 481.95,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 459,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 22.95,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 11.475,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 11.475,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 481.95,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031746",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "1",
                    "customers_mobile": "9599903137",
                    "street_name": "9",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "VG2-1Peppy Paneer",
                            "description": "VG2-1Peppy Paneer",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0120",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 22.95,
                        "pricePerQty": 459,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 22.95,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 3,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            },
            {
                "id": "668f64a29232287484ce8a06",
                "orderId": "DPI6585R202407115712",
                "deliveryPhoneNumber": "9599903137",
                "orderStatus": "ORDER_DELIVERED",
                "orderCurrentState": 1,
                "orderTimeStamp": 1720673436633,
                "punchTimeStamp": 1720673436633,
                "deliveryTimeStamp": 1720674308000,
                "price": 549,
                "tax": 27.45,
                "charges": null,
                "discount": 0,
                "netPrice": 576,
                "finalPrice": 576.45,
                "paymentSummary": {
                    "fetchLoyaltyEarnPoints": null,
                    "loyaltyEarnPointsFetched": null,
                    "paymentSummaryItem": [
                        {
                            "label": "Sub Total",
                            "value": 549,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Discount",
                            "value": null,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        },
                        {
                            "label": "Taxes & Charges",
                            "value": 27.45,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": [
                                {
                                    "label": "CGST",
                                    "value": 13.725,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "SGST",
                                    "value": 13.725,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                },
                                {
                                    "label": "IGST",
                                    "value": 0,
                                    "hasChild": null,
                                    "wallet": null,
                                    "discount": null
                                }
                            ]
                        },
                        {
                            "label": "Grand Total",
                            "value": 576.45,
                            "hasChild": null,
                            "wallet": null,
                            "discount": null,
                            "childList": null
                        }
                    ]
                },
                "paymentResponse": {
                    "payments": []
                },
                "advanceOrderInProgress": null,
                "cancellable": null,
                "tentNumber": "cash-770031747",
                "feedbackVariant": null,
                "shouldShowFeedbackRating": null,
                "refund": null,
                "irctcOrder": false,
                "advanceOrder": false,
                "currentOrder": null,
                "favourite": null,
                "store": {
                    "orderId": null,
                    "addressLine": "POKHRA TEST RESTAURANT",
                    "name": "POKHRA TEST RESTAURANT",
                    "phoneNumber": null,
                    "id": "DPI6585R",
                    "orderDate": null,
                    "orderTime": null,
                    "priceZone": null,
                    "online": null,
                    "baseRegion": null,
                    "storeCity": null,
                    "city": null,
                    "region": null,
                    "postalCode": null,
                    "latitude": null,
                    "longitude": null,
                    "cityCode": null,
                    "showStoreStations": null
                },
                "userDetails": {
                    "mobile": "9599903137",
                    "firstName": "Dhruv",
                    "lastName": "Dhruv",
                    "email": null
                },
                "deliveryAddress": {
                    "building_number": "1",
                    "customers_mobile": "9599903137",
                    "street_name": "9",
                    "area_level0": "P5VC+MQ, Bhalswa Dairy, Bhalswa, Delhi, 110042, India",
                    "city_region": null,
                    "area_level2": "",
                    "area_level1": ".",
                    "city": null,
                    "country": null,
                    "longitude": null,
                    "latitude": null,
                    "formatted_address": null,
                    "address_type": "R",
                    "postal_code": "110032"
                },
                "source": {
                    "client": "ROI",
                    "source": null,
                    "apiClientTitle": null,
                    "userAgent": null,
                    "platform": "",
                    "rawStr": null,
                    "tenant": "INDIA",
                    "apiKey": null
                },
                "deliveryOrderType": {
                    "deliveryTypeCode": "D"
                },
                "items": [
                    {
                        "itemId": null,
                        "product": {
                            "name": "Feast Veg Extravanga",
                            "description": "Feast Veg Extravanga",
                            "baked": true,
                            "foodType": "Veg",
                            "menuCode": "PIZ0124",
                            "menuCat": "MCT0001",
                            "sizeCode": "BHT95",
                            "fmcg": false
                        },
                        "productType": "PIZZA",
                        "quantity": 1,
                        "taxPercentage": 5,
                        "taxAmount": 27.45,
                        "pricePerQty": 549,
                        "totalDiscount": 0,
                        "taxes": [
                            {
                                "amount": 27.45,
                                "labelName": "GST"
                            }
                        ],
                        "pizza": true
                    }
                ],
                "orderNumber": 4,
                "orderRefundBlock": false,
                "addedBy": null,
                "aodDetails": null,
                "mobinData": null,
                "actualOrderDate": null,
                "orderSavedTime": null,
                "payNow": null,
                "kitchenDisplayTime": null,
                "prepaid": null,
                "roundOff": null,
                "commonTipAmount": null,
                "riderTipAmount": null,
                "insiderTipAmount": null,
                "aggregatorGSTCalculation": null,
                "digitalPayments": null,
                "ccTxnDetails": null,
                "timeServiceGuarantee": "20"
            }
        ],
        "hasNext": true
    }
    const orders = response.orders;
    res.render('orderlist', { orders });
});


app.use("/selected-details", async (req, res) => {
    res.render('selected-details');
});

app.post('/feedbackCategory', (req, res) => {
    res.render('feedbackCategory',);
});


app.use("/the4Pizza2", async (req, res) => {
    res.render('the4Pizza2',);
});

app.use("/refund", async (req, res) => {
    res.render('refund',);
});

app.use("/requestResolved", async (req, res) => {
    res.render('requestResolved');
});

app.use("/submitForm", async (req, res) => {
    res.render('submitForm');
});

app.use("/the4CheesePizza", async (req, res) => {


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


    const response =
    {
        "data": {
            "groups": [
                {
                    "id": 1,
                    "name": "productQuality",
                    "displayText": "Product Quality",
                    "categories": [
                        {
                            "id": 20,
                            "name": "productQuality",
                            "displayText": "Product Quality",
                            "isSingleValue": 0,
                            "subCategories": [
                                {
                                    "id": 31,
                                    "displayText": "Cheese & Topping",
                                    "isFtr": false,
                                    "reasonId": 603
                                },
                                {
                                    "id": 32,
                                    "displayText": "Cold Product Received",
                                    "isFtr": false,
                                    "reasonId": 600
                                },
                                {
                                    "id": 33,
                                    "displayText": "Taste",
                                    "isFtr": false,
                                    "reasonId": 602
                                },
                                {
                                    "id": 34,
                                    "displayText": "Veg/Non-Veg",
                                    "isFtr": false,
                                    "reasonId": 601
                                }
                            ]
                        },
                        {
                            "id": 42,
                            "name": "foreignParticle",
                            "displayText": "Foreign Particles",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 89,
                                    "displayText": "Hair in Product",
                                    "isFtr": false,
                                    "reasonId": 620
                                },
                                {
                                    "id": 90,
                                    "displayText": "Other particle",
                                    "isFtr": false,
                                    "reasonId": 621
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "serviceIssues",
                    "displayText": "Service Issues",
                    "categories": [
                        {
                            "id": 21,
                            "name": "orderDelay",
                            "displayText": "Late Order",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 35,
                                    "displayText": "Delivery Pending",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 36,
                                    "displayText": "Order Delivered Late",
                                    "isFtr": true,
                                    "reasonId": 601
                                }
                            ]
                        },
                        {
                            "id": 23,
                            "name": "staffBehaviour",
                            "displayText": "Staff Behaviour",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 47,
                                    "displayText": "Rude Behaviour",
                                    "isFtr": false,
                                    "reasonId": 623
                                },
                                {
                                    "id": 48,
                                    "displayText": "Staff Knowledge",
                                    "isFtr": false,
                                    "reasonId": 624
                                },
                                {
                                    "id": 49,
                                    "displayText": "Staff Not Supportive",
                                    "isFtr": false,
                                    "reasonId": 625
                                }
                            ]
                        },
                        {
                            "id": 24,
                            "name": "incompleteWrong",
                            "displayText": "Wrong Order Delivered",
                            "isSingleValue": 0,
                            "subCategories": [
                                {
                                    "id": 50,
                                    "displayText": "Incomplete Order Delivered",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 51,
                                    "displayText": "Wrong Order Delivered",
                                    "isFtr": false,
                                    "reasonId": 622
                                }
                            ]
                        },
                        {
                            "id": 43,
                            "name": "orderCancelled",
                            "displayText": "Order Cancelled",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 91,
                                    "displayText": "Restaurant cancelled Order",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 92,
                                    "displayText": "My order not cancelled by the restaurant",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "paymentsOrRefunds",
                    "displayText": "Payment or Refunds",
                    "categories": [
                        {
                            "id": 26,
                            "name": "refundRelated",
                            "displayText": "Refund Issues",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 291,
                                    "displayText": "Order Failed - Refund Pending",
                                    "isFtr": true,
                                    "reasonId": null
                                },
                                {
                                    "id": 292,
                                    "displayText": "Order Cancelled - Refund Pending",
                                    "isFtr": true,
                                    "reasonId": null
                                }
                            ]
                        },
                        {
                            "id": 28,
                            "name": "couponEvoucher",
                            "displayText": "Coupon or E-Voucher",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 57,
                                    "displayText": "Coupon",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 58,
                                    "displayText": "E-Voucher",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "others",
                    "displayText": "Others",
                    "categories": [
                        {
                            "id": 37,
                            "name": "duplicateBill",
                            "displayText": "Duplicate Bill",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 66,
                                    "displayText": "Duplicate Bill",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        },
                        {
                            "id": 41,
                            "name": "appreciation",
                            "displayText": "Give Appreciation",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 71,
                                    "displayText": "Digital Experience",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 85,
                                    "displayText": "Product",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 86,
                                    "displayText": "Employee",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 87,
                                    "displayText": "Brand",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        },
                        {
                            "id": 73,
                            "name": "restaurantFeedback",
                            "displayText": "Restaurant Feedback",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 293,
                                    "displayText": "Ambience",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 294,
                                    "displayText": "Hygiene",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
        ;
    // console.log(response.data.groups, "feedback");
    const orders = response.data.groups;
    res.render('the4CheesePizza', { orders });
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


    const response =
    {
        "data": {
            "groups": [
                {
                    "id": 1,
                    "name": "productQuality",
                    "displayText": "Product Quality",
                    "categories": [
                        {
                            "id": 20,
                            "name": "productQuality",
                            "displayText": "Product Quality",
                            "isSingleValue": 0,
                            "subCategories": [
                                {
                                    "id": 31,
                                    "displayText": "Cheese & Topping",
                                    "isFtr": false,
                                    "reasonId": 603
                                },
                                {
                                    "id": 32,
                                    "displayText": "Cold Product Received",
                                    "isFtr": false,
                                    "reasonId": 600
                                },
                                {
                                    "id": 33,
                                    "displayText": "Taste",
                                    "isFtr": false,
                                    "reasonId": 602
                                },
                                {
                                    "id": 34,
                                    "displayText": "Veg/Non-Veg",
                                    "isFtr": false,
                                    "reasonId": 601
                                }
                            ]
                        },
                        {
                            "id": 42,
                            "name": "foreignParticle",
                            "displayText": "Foreign Particles",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 89,
                                    "displayText": "Hair in Product",
                                    "isFtr": false,
                                    "reasonId": 620
                                },
                                {
                                    "id": 90,
                                    "displayText": "Other particle",
                                    "isFtr": false,
                                    "reasonId": 621
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "serviceIssues",
                    "displayText": "Service Issues",
                    "categories": [
                        {
                            "id": 21,
                            "name": "orderDelay",
                            "displayText": "Late Order",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 35,
                                    "displayText": "Delivery Pending",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 36,
                                    "displayText": "Order Delivered Late",
                                    "isFtr": true,
                                    "reasonId": 601
                                }
                            ]
                        },
                        {
                            "id": 23,
                            "name": "staffBehaviour",
                            "displayText": "Staff Behaviour",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 47,
                                    "displayText": "Rude Behaviour",
                                    "isFtr": false,
                                    "reasonId": 623
                                },
                                {
                                    "id": 48,
                                    "displayText": "Staff Knowledge",
                                    "isFtr": false,
                                    "reasonId": 624
                                },
                                {
                                    "id": 49,
                                    "displayText": "Staff Not Supportive",
                                    "isFtr": false,
                                    "reasonId": 625
                                }
                            ]
                        },
                        {
                            "id": 24,
                            "name": "incompleteWrong",
                            "displayText": "Wrong Order Delivered",
                            "isSingleValue": 0,
                            "subCategories": [
                                {
                                    "id": 50,
                                    "displayText": "Incomplete Order Delivered",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 51,
                                    "displayText": "Wrong Order Delivered",
                                    "isFtr": false,
                                    "reasonId": 622
                                }
                            ]
                        },
                        {
                            "id": 43,
                            "name": "orderCancelled",
                            "displayText": "Order Cancelled",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 91,
                                    "displayText": "Restaurant cancelled Order",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 92,
                                    "displayText": "My order not cancelled by the restaurant",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "paymentsOrRefunds",
                    "displayText": "Payment or Refunds",
                    "categories": [
                        {
                            "id": 26,
                            "name": "refundRelated",
                            "displayText": "Refund Issues",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 291,
                                    "displayText": "Order Failed - Refund Pending",
                                    "isFtr": true,
                                    "reasonId": null
                                },
                                {
                                    "id": 292,
                                    "displayText": "Order Cancelled - Refund Pending",
                                    "isFtr": true,
                                    "reasonId": null
                                }
                            ]
                        },
                        {
                            "id": 28,
                            "name": "couponEvoucher",
                            "displayText": "Coupon or E-Voucher",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 57,
                                    "displayText": "Coupon",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 58,
                                    "displayText": "E-Voucher",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 4,
                    "name": "others",
                    "displayText": "Others",
                    "categories": [
                        {
                            "id": 37,
                            "name": "duplicateBill",
                            "displayText": "Duplicate Bill",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 66,
                                    "displayText": "Duplicate Bill",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        },
                        {
                            "id": 41,
                            "name": "appreciation",
                            "displayText": "Give Appreciation",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 71,
                                    "displayText": "Digital Experience",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 85,
                                    "displayText": "Product",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 86,
                                    "displayText": "Employee",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 87,
                                    "displayText": "Brand",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        },
                        {
                            "id": 73,
                            "name": "restaurantFeedback",
                            "displayText": "Restaurant Feedback",
                            "isSingleValue": 1,
                            "subCategories": [
                                {
                                    "id": 293,
                                    "displayText": "Ambience",
                                    "isFtr": false,
                                    "reasonId": null
                                },
                                {
                                    "id": 294,
                                    "displayText": "Hygiene",
                                    "isFtr": false,
                                    "reasonId": null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
        ;
    // console.log(response.data.groups, "feedback");
    const orders = response.data.groups;
    res.render('orderSelection', { orders });

});
app.use("/feedbackCategory", async (req, res) => {
    res.render('feedbackCategory');
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