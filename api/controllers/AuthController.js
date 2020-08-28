const { Op } = require("sequelize");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../keys");

module.exports = {
  // Authenticate email and password
  async signIn(req, res) {
    const { email, password } = req.body;

    // Validation of form data
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: { msg: "Please enter all fields!" } });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: { msg: "This user doesn't exists on database" } });
    }
    const { password: userPassword, ...userPayload } = user.dataValues;

    // Validate password
    try {
      const match = await bcrypt.compare(password, userPassword);
      if (!match) {
        return res.status(400).json({ error: { msg: "Invalid credentials" } });
      }

      jwt.sign(
        { id: userPayload.id },
        keys.JWT,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, user: userPayload });
        }
      );
    } catch (err) {
      console.log(err);
    }

    // let hashedPwd = undefined;
    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(password, salt, async (err, hash) => {
    //     if (err) throw err;
    //     hashedPwd = hash;
    //     try {
    //       const user = await User.create({ name, email, password: hashedPwd });
    //       const { password, ...userJson } = user.dataValues;

    //       jwt.sign(
    //         { id: userJson.id },
    //         keys.JWT,
    //         { expiresIn: 10800 },
    //         (err, token) => {
    //           if (err) throw err;
    //           return res.json({ token, user: userJson });
    //         }
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });
    // });
  },
  // Authenticate email and password
  async getUser(req, res) {
    const { campaigns, adventures } = req.query;
    try {
      const user = await User.scope("withoutPassword").findByPk(
        req.user.id,
        (adventures == 1 || campaigns == 1) && {
          include: [
            ...(adventures == 1
              ? [
                  {
                    association: "adventures",
                    required: false,
                    where: { gmId: { [Op.ne]: userId } },
                    through: { attributes: [] },
                  },
                ]
              : []),
            ...(campaigns == 1 ? [{ association: "campaigns" }] : []),
          ],
        }
      );
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};
