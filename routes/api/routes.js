// function backPhone() {
//     document.getElementById('otp').style.display = 'none';
//     document.getElementById('phone_number').style.display = 'block';
// }

// function showOTP() {
//     document.getElementById('phone_number').style.display = 'none';
//     document.getElementById('otp').style.display = 'block';
// }
// function showOrderlist() {
//     document.getElementById('otp').style.display = 'none';
//     document.getElementById('orderlist').style.display = 'block';
// }
// function showorderSelection() {
//     document.getElementById('orderlist').style.display = 'none';
//     document.getElementById('orderSelection').style.display = 'block';
// }
// function the4pizza() {
//     document.getElementById('orderlist').style.display = 'none';
//     document.getElementById('the4pizza').style.display = 'block';
// }
// function backPage11() {
//     document.getElementById('the4pizza1').style.display = 'none';
//     document.getElementById('the4pizza').style.display = 'block';
// }
// function backPage() {
//     document.getElementById('the4pizza').style.display = 'none';
//     document.getElementById('orderlist').style.display = 'block';
// }
// function feedbackPage() {
//     document.getElementById('the4pizza').style.display = 'none';
//     document.getElementById('the4pizza1').style.display = 'block';
// }
// function feedbackPage1() {
//     document.getElementById('the4pizza1').style.display = 'none';
//     document.getElementById('submitForm').style.display = 'block';
// }
// function backSection1() {
//     document.getElementById('feedbackCategory').style.display = 'none';
//     document.getElementById('the4pizza').style.display = 'block';
// }
// function backSection2() {
//     document.getElementById('orderSelection').style.display = 'none';
//     document.getElementById('orderlist').style.display = 'block';
// }
// function forward() {
//     document.getElementById('feedbackCategory').style.display = 'none';
//     document.getElementById('submitForm').style.display = 'block';
// }
// function submitSection() {
//     document.getElementById('orderSelection').style.display = 'none';
//     document.getElementById('submitForm').style.display = 'block';
// }

// document.addEventListener("DOMContentLoaded", function (event) {

//     function OTPInput() {
//         const inputs = document.querySelectorAll('#otp > *[id]');
//         for (let i = 0; i < inputs.length; i++) {
//             inputs[i].addEventListener('keydown', function (event) {
//                 if (event.key === "Backspace") {
//                     inputs[i].value = '';
//                     if (i !== 0) {
//                         inputs[i - 1].focus();
//                     }
//                 } else {
//                     if (i === inputs.length - 1 && inputs[i].value !== '') {
//                         return true;
//                     } else if (event.keyCode > 47 && event.keyCode < 58) {
//                         inputs[i].value = event.key;
//                         if (i !== inputs.length - 1) {
//                             inputs[i + 1].focus();
//                             event.preventDefault();
//                         }
//                     }
//                     else if (event.keyCode > 64 && event.keyCode < 91) {
//                         inputs[i].value = String.fromCharCode(event.keyCode);
//                         if (i !== inputs.length - 1) {
//                             inputs[i + 1].focus();
//                             event.preventDefault();
//                         }
//                     }
//                 }
//             });
//         }
//     }
//     OTPInput();
// });



// function createChildElements(container, values, category) {
//     values.forEach(value => {
//         const childElement = document.createElement('p');
//         childElement.classList.add('child-6');
//         childElement.textContent = value;

//         childElement.addEventListener('click', function () {
//             document.querySelectorAll('.child-6').forEach(child => {
//                 child.classList.remove('selected');
//             });
//             this.classList.add('selected');


//         });

//         container.appendChild(childElement);
//     });
// }

// const dynamicContainer = document.getElementById('dynamicContainer2');
// const child6Values = ['Delivery Pending', 'Order Delivered Late', 'Subcategory'];
// createChildElements(dynamicContainer, child6Values, 'deliveryOption');

// const dynamicContainer1 = document.getElementById('dynamicContainer3');
// const child6Values1 = ['Taste ', 'Cheese & Topping ', 'Cold Product Received'];
// createChildElements(dynamicContainer1, child6Values1, 'productQuality');

// const dynamicContainer2 = document.getElementById('dynamicContainer4');
// const child6Values2 = ['Incomplete Order Delivered ', 'Wrong Order Delivered '];
// createChildElements(dynamicContainer2, child6Values2, 'wrongOrder');

// const dynamicContainer3 = document.getElementById('dynamicContainer5');
// const child6Values3 = ['Request Duplicate Bill ', 'Wrong Bill Received', 'Give Appreciation', 'Reward Related Issues'];
// createChildElements(dynamicContainer3, child6Values3, 'others');
                                                                
                                                                      
                                                                      
                                                                      
                                                                      

// // const ordersData = [
// //     { id: "436564", name: "The 4 Cheese Pizza", details: "+ 7 other items", date: "13 Jul 2023", time: "17:15:07", total: "₹1,671.00" },
// //     { id: "93843", name: "Garlic Bread", details: "+ 13 other items", date: "13 Jul 2023", time: "17:15:07", total: "₹1,671.00" },
// //     { id: "43345", name: "Garlic Bread", details: "+ 1 other items", date: "13 Jul 2023", time: "17:15:07", total: "₹1,671.00" },
// //     { id: "53653", name: "The 4 Cheese Pizza", details: "+ 3 other items", date: "13 Jul 2023", time: "17:15:07", total: "₹1,671.00" },
// //     { id: "78432", name: "Garlic Bread", details: "+ 3 other items", date: "13 Jul 2023", time: "17:15:07", total: "₹1,671.00" },
// //     { id: "99283", name: "The cheese Pizza", details: "+2 other items", date: "13 Jul 2023", time: "13:23:14", total: "₹4,234,45" },
// //     { id: "8998", name: "The cheese Pizza", details: "+2 other items", date: "13 Jul 2023", time: "12:23:45", total: "134134134" },
// // ];

// function generateOrderHTML(order, i) {
//     let className = i === 0 ? 'highlight' : '';

//     return `
//   <div class="frame-6 ${className} OrderName" data-id="${order.id}" onclick="selectOrder('${order.id}', event)">
//     <div class="frame-4">
//       <div class="text-wrapper-2">Order ${order.id}</div>
//       <p class="p">${order.name}<br />${order.details}</p>
//       <div class="frame-5">
//         <div class="text-wrapper-2">${order.date}</div>
//         <img class="line" src="img/line-21.svg" />
//         <div class="text-wrapper-2">${order.time}</div>
//         <img class="line" src="img/line-22.svg" />
//         <div class="text-wrapper-2">${order.total}</div>
//       </div>
//     </div>
//     <img class="vector" src={{asset 'arrow.png'}} />
//   </div>
// `;
// }

// const orderContainer = document.getElementById("orderContainer");

// ordersData.forEach((order, index) => {
//     orderContainer.innerHTML += generateOrderHTML(order, index);
// });

// function selectOrder(orderId, e) {
//     console.log('working', e.target);
//     const previous = document.querySelectorAll('.OrderName');

//     previous.forEach(element => {
//         element.classList.remove('highlight');
//     });

//     previous.forEach(element => {
//         if (element.dataset.id == orderId) {
//             element.classList.add('highlight');
//             getDataByClasses(orderId);
//         }
//     });
// }


// function showSelectedValues() {
//     const selectedValuesContainer = document.querySelector('#the4pizza2 .child-5');
//     selectedValuesContainer.innerHTML = '';

//     for (const category in selectedValues) {
//         const value = selectedValues[category];
//         if (value) {
//             const selectedValueElement = document.createElement('p');
//             selectedValueElement.textContent = `${category}: ${value}`;
//             selectedValuesContainer.appendChild(selectedValueElement);
//         }
//     }
// }
