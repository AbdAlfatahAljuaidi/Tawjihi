const { SignUp, SignUpValidation } = require("../models/Users");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

/**
 * @description SignUp
 * @route SignUp
 * @Method Post
 * @Access Public
 */

const SignUpUser = async (req, res) => {
  try {
    console.log("start");

    const { error } = SignUpValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { Name, Email, Password } = req.body;

    const IfExist = await SignUp.findOne({ Email });

    if (IfExist) {
      return res
        .status(401)
        .json({ error: true, message: "User Already Exist" });
    }
    console.log(IfExist);

    const newUser = await SignUp.create({
      Name,
      Email,
      Password,
    });

    console.log("after create");

    res.status(200).json({
      error: false,
      message:
        "تم ارسال الطلب بنجاح يرجى انتظار ارسال كلمة السر على الايميل الخاص بك",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

/**
 * @description Show Requests
 * @route ShowRequests
 * @Method Get
 * @Access Private
 */

const ShowUsers = async (req, res) => {
  try {
    const Users = await SignUp.find();

    // تصفية المستخدمين الذين لا يحققون الشرط
    const filteredUsers = Users.filter(
      (user) => !(user.Password !== "" && user.Reset === 0)
    );

    res.status(200).json({
      error: false,
      message: "Display Filtered Users",
      Users: filteredUsers,
    });
  } catch (error) {
    console.log(error.response);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

/**
 * @description Delete Requests
 * @route DeleteRequests
 * @Method delete
 * @Access Private
 */

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // استخراج الـ ID من الـ params في الرابط

    // حذف المستخدم بناءً على الـ ID
    const deletedUser = await SignUp.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // إرسال استجابة بنجاح الحذف
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @description Login
 * @route User/Home
 * @Method Post
 * @Access Public
 */

const Login = async (req, res) => {
  const { Email, Password } = req.body;

  const user = await SignUp.findOne({ Email });

  if (!user) {
    return res.status(404).json({ error: true, message: "الايميل غير موجود" });
  }

  if (user.Password == "") {
    return res
      .status(404)
      .json({ error: true, message: "كلمة السر غير صحيحة" });
  }

  if (user.Password != Password) {
    return res
      .status(404)
      .json({ error: true, message: "كلمة السر غير صحيحة" });
  }

  if (user.Active >= 2) {
    return res
      .status(403)
      .json({ error: true, message: "تم الوصول إلى الحد الأقصى لعدد الجلسات" });
  }

  // تحديث قيمة active بزيادة 1
  user.Active += 1;
  await user.save();

  const token = jwt.sign({ id: user._id }, "dsadsadh");

  res.status(200).json({
    error: false,
    message: "login success",
    user: { ...user._doc, token },
  });
};

/**
 * @description SignOut
 * @route SignOut
 * @Method Post
 * @Access Public
 */


//test

const SignOut = async (req, res) => {
  const { id } = req.params; // استخراج الـ ID من الـ params في الرابط

  // حذف المستخدم بناءً على الـ ID
  const user = await SignUp.findById(id);
  console.log(user);

  user.Active -= 1;
  await user.save();
  res.status(200).json({ error: false, message: "تم تسجيل  الخروج" });
};

/**
 * @description Reset Password 
 * @route ResetPassword 
 * @Method Post
 * @Access Public
 */

const ResetPassword = async (req, res) => {
  try {
    console.log("start");

    const { Email } = req.body;

    const user = await SignUp.findOne({ Email });

    if (!user) {
      return res.status(401).json({ error: true, message: "ليس لديك حساب " });
    }

    if (user.Password == "") {
      return res
        .status(401)
        .json({ error: true, message: " ما زال طلبك قيد المراجعة   " });
    }

    console.log("after create");

    if (user.Reset == 0) {
      user.Reset = 1;
      await user.save();
    }

    res.status(200).json({
      error: false,
      message:
        "تم ارسال الطلب بنجاح يرجى انتظار ارسال كلمة السر على الايميل الخاص بك",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

/**
 * @description set user password
 * @route /set-user-password
 * @Method Post
 * @Access private (only admin)
 */
const setPassword = async (req, res) => {
  try {
    const { adminMail, email, password } = req.body;

    const isAdminFound = await SignUp.findOne({ Email: adminMail });

    if (!isAdminFound) {
      return res.status(403).json({ error: true, message: "غير مسموح" });
    }

    // 1- set the user password
    const user = await SignUp.findOneAndUpdate(
      { Email: email },
      { Password: password, Reset: 0 },
      { new: true }
    );

    // 2- send email
    await sendEmail(
      email,
      password,
      user.Name,
      "تم انشاء كلمة السر",
      "passwordcreated"
    );
    console.log("password set successfully");
    res
      .status(200)
      .json({ error: false, message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
  }
};



/**
 * @description Get All Users
 * @route /set-user-password
 * @Method Post
 * @Access private (only admin)
 */

const getUsers = async (req,res) => {
  try {
    const allUsers = await SignUp.find();

    // تصفية المستخدمين الذين لا يحققون الشرط
   

    res.status(200).json({
      error: false,
      message: "Display Users",
      allUsers: allUsers,
    });
  } catch (error) {
    console.log(error.response);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }

}
  




module.exports = {
  SignUpUser,
  ShowUsers,
  deleteUser,
  Login,
  SignOut,
  ResetPassword,
  setPassword,
  getUsers,
};
