const router = require("express").Router();
const userRouter = require("../controller/userController");

router.post("/addUserData",userRouter.addUserData);
router.post("/addUser",userRouter.addUser);
router.get("/getAllUser",userRouter.getAllUser);
router.get("/getOneUser/:id",userRouter.getOneUser);
router.put("/updateAllField/:id",userRouter.updateAllField)
router.delete("/userDelete/:id",userRouter.userDelete);

module.exports = router;