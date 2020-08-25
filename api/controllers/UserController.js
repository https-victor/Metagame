const { Op } = require("sequelize");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../keys");

module.exports = {
  // Get all users
  // campaigns = 1 will retrieve all campaigns that these users is a GM
  // adventures = 1 will retrieve all campaigns that these users is a p
  async getAllUsers(req, res) {
    const { campaigns, adventures } = req.query;
    try {
      const users = await User.scope("withoutPassword").findAll({
        include: [
          ...(adventures == 1
            ? [
                {
                  association: "adventures",
                  required: false,
                  where: { gmId: { [Op.ne]: { [Op.col]: "user.id" } } },
                  through: { attributes: [] },
                },
              ]
            : []),
          ...(campaigns == 1 ? [{ association: "user_campaigns" }] : []),
        ],
      });
      return res.json(users);
    } catch (error) {
      console.log(error);
    }
  },

  //  Get user by id
  // Get all campaigns by gmId
  // campaigns = 1 will retrieve all campaigns that this user is a GM
  // adventures = 1 will retrieve all campaigns that this user is a player
  async getUserById(req, res) {
    const { userId } = req.params;
    const { campaigns, adventures } = req.query;
    try {
      const user = await User.findByPk(
        userId,
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
            ...(campaigns == 1 ? [{ association: "user_campaigns" }] : []),
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

  // Create a new user
  async createNewUser(req, res) {
    const { name, email, password } = req.body;

    // Validation of form data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: { msg: "Please enter all fields!" } });
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return res
        .status(400)
        .json({ error: { msg: "This user already exists" } });
    }
    let hashedPwd = undefined;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        hashedPwd = hash;
        try {
          const user = await User.create({ name, email, password: hashedPwd });
          const { password, ...userPaylod } = user.dataValues;

          jwt.sign(
            { id: userPaylod.id },
            keys.JWT,
            { expiresIn: 10800 },
            (err, token) => {
              if (err) throw err;
              return res.json({ token, user: userPaylod });
            }
          );
        } catch (error) {
          console.log(error);
        }
      });
    });
  },
};
