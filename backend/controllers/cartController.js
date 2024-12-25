import userModel from "../models/userModels.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cart;
    // if there is no item
    if (!cartData[req.body.itemId]) cartData[req.body.itemId] = 1;
    else cartData[req.body.itemId]++;
    await userModel.findByIdAndUpdate(req.body.userId, { cart: cartData });
    // console.log(userData.cart);
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.json({ success: false, message: "Faild to add to cart" });
  }
};
// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cart;
    if (cartData[req.body.itemId] > 0) cartData[req.body.itemId]--;
    await userModel.findByIdAndUpdate(req.body.userId, { cart: cartData });
    // console.log(userData.cart);
    res.json({ success: true, message: "removed from cart" });
  } catch (error) {
    res.json({ success: false, message: "Faild to remove to cart" });
  }
};
// fetch from user cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cart;

    res.json({ success: true, cartData: cartData });
  } catch (error) {
    res.json({ success: false, message: "Faild to fetch cart" });
  }
};

export { addToCart, removeFromCart, getCart };
