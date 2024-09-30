
function submit_form() {

    alert("hi")
  let title = document.getElementById("title").value;
  let phoneNumber = document.getElementById("PhoneNumber").value;
  let eMail = document.getElementById("EMail").value;
  let residenceCity = document.getElementById("ResidenceCity").value;
  let restaurantCity = document.getElementById("RestaurantCity").value;
  let restaurantAddress = document.getElementById("RestaurantAddress").value;
  let orderSource = document.getElementById("OrderSource").value;
  let feedbackType = document.getElementById("FeedbackType").value;
  let comments = document.getElementById("Comments").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;

  console.log("title", title);
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("phoneNumber", phoneNumber);
  console.log("eMail", eMail);
  console.log("residenceCity", residenceCity);
  console.log("restaurantCity", restaurantCity);
  console.log("restaurantAddress", restaurantAddress);
  console.log("orderSource", orderSource);
  console.log("feedbackType", feedbackType);
  console.log("comments", comments);

  // api call

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Basic c2Fyb2phY2hhcnlhNjY5NEBnbWFpbC5jb206VGVzdEAxMjM0"
  );
  myHeaders.append(
    "Cookie",
    "__cfruid=c083a1af74b3cde421797b3dbddedb52d3c5121e-1689313098; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca"
  );

  var raw = JSON.stringify({
    
    ticket: {
      subject: "My Pizza Order",
      comment: {
        body: "Testing",
      },
      custom_fields: [
        {
          id: 12191900966813,
          value: residenceCity,
        },
        {
          id: 12191939531293,
          value: restaurantCity,
        },
        {
          id: 12191997229085,
          value: restaurantAddress,
        },
        {
          id: 12192015437725,
          value: orderSource,
        },
        {
          id: 12192038955293,
          value: feedbackType,
        },
      ],
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://saroj5089.zendesk.com/api/v2/tickets.json", requestOptions)
    .then((response) => {
      debugger;
      response.text();
    })
    .then((result) => {
      debugger;
      console.log(result);
    })
    .catch((error) => {
      debugger;
      console.log("error", error);
    });
}
