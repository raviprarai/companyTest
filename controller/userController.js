const usermodel = require("../model/userModel");
const Joi = require("joi");
const { userDetails } = require("../validators/allValidator");
exports.addUser = async (req, res) => {
  try {
    const data = req.body;
    const userSchema = Joi.object({
      firstName: Joi.string()
        .regex(/^[a-zA-Z]{3,30}$/)
        .required(),
      lastName: Joi.string()
        .regex(/^[a-zA-Z]{3,30}$/)
        .required(),
      email: Joi.string().email().required(),
      country: Joi.string()
        .regex(/^[a-zA-Z]{2,30}$/)
        .required(),
      state: Joi.string()
        .regex(/^[a-zA-Z]{2,30}$/)
        .required(),
      city: Joi.string()
        .regex(/^[a-zA-Z]{2,30}$/)
        .required(),
      gender: Joi.string().required(),
      date_of_birth: Joi.date().min("01-01-2009").max("now").iso().required(),
      age: Joi.number(),
    });
    let result = userSchema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
    const exist = await usermodel.exists({ email: req.body.email });
    if (exist) {
      return res.status(400).send("This Email is already taken!");
    } else {
      const responce = await usermodel.create(data);
      const title = "User Data";
      const d = responce.date_of_birth;
      var dob = new Date(d);
      var month_diff = Date.now() - dob.getTime();
      var age_dt = new Date(month_diff);
      var year = age_dt.getUTCFullYear();
      var age = Math.abs(year - 1970);
      console.log("Age of the date entered: " + age + " years");
      const result = await usermodel.findOneAndUpdate(
        { email: req.body.email },
        { age: age },
        { new: true }
      );
      if (result) {
        return res.status(200).json({
          status: 1,
          message: "Add User Successfully",
          title,
          result,
        });
      } else {
        return res.status(400).json({
          status: 0,
          message: "Wrong",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const data = await usermodel.find();
    if (!data[0]) {
      return res.status(404).json({
        status: 0,
        message: "Data Not Found...",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "All User Found..",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.getOneUser = async (req, res) => {
  try {
    const data = await usermodel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 0,
        message: "Id Not Found...",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "User Found successfully..",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.updateAllField = async (req, res) => {
  try {
    const data = req.body;
    const validateKey = [
      "firstName",
      "lastName",
      "email",
      "country",
      "state",
      "city",
      "gender",
      "date_of_birth",
    ];
    for (let key of validateKey) {
      if (!data[key] || data[key] == undefined) {
        return res.status(400).json({
          status: 0,
          message: key + "" + " all filed required.",
        });
      }
    }
    const updatedleader = await usermodel.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({
      status: 1,
      message: "update Data  successfully.",
      updatedleader,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.userDelete = async (req, res) => {
  try {
    const data = await usermodel.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 0,
        message: "Data Not Found..",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "User Deleted Successfully..",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
exports.addUserData = async (req, res) => {
  try {
    const data = req.body;
    const { error } = userDetails.validate(data);
    if (error) {
      return res.status(400).json(error.details[0].message);
    } else {
      const exist = await usermodel.exists({ email: req.body.email });
      if (exist) {
        return res.status(400).send("This Email is already taken!");
      } else {
        const response = await usermodel.create(data);
        const title = "User Data";
        function getYears(x) {
          return Math.floor(x / 1000 / 60 / 60 / 24 / 365);
        }
        const docs = await usermodel.find({
          date_of_birth: req.body.date_of_birth,
        });
        let promises = [];
        docs.forEach((doc) => {
          let n = Date.now();
          let d = new Date(doc.date_of_birth);
          let m = doc.set("age", getYears(n - d));
          promises.push(m);
        });
        Promise.all(promises)
          .then(async (resp) => {
            resp = resp[0];
            await usermodel.findOneAndUpdate(
              { date_of_birth: req.body.date_of_birth },
              { ...resp }
            );
            return res.status(200).send({ title, resp });
          })
          .catch((e) => {
            return res.status(500).send({ e: e.message });
          });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.toString(),
    });
  }
};
