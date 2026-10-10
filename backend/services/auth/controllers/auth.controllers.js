import crypto from "crypto";

import { getAuth } from "firebase-admin/auth";
import redis from "../../../shared/redis/redis.js";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";


export const login = async (
  req,
  res
) => {

  try {


    const { token } = req.body;

    const decoded =
      await getAuth(app)
        .verifyIdToken(token);

    console.log(decoded);


    let user =
      await User.findOne({
        firebaseUid:
          decoded.uid,
      });

    if (!user) {

      user =
        await User.create({

          firebaseUid:
            decoded.uid,

          email:
            decoded.email,

          name:
            decoded.name,

          avatar:
            decoded.picture,

          provider:
            decoded.firebase
              ?.sign_in_provider,
        });
    }

    const sessionId =
      crypto.randomUUID();

    await redis.set(
      `user-session:${user._id}`,
      sessionId,
      "EX",
      60 * 60 * 24 * 7
    );

    await redis.set(

      `session:${sessionId}`,

      JSON.stringify({

        userId:
          user._id,

        email:
          user.email,
        avatar:
          user.avatar,
        name: user.name,
      }),

      "EX",

      60 * 60 * 24 * 7
    );

    res.cookie(

      "session",

      sessionId,

      {
        httpOnly: true,

        secure: false,

        sameSite: "lax",

        maxAge:
          1000 *
          60 *
          60 *
          24 *
          7,
      }
    );

    return res.json({

      success: true,

      user,
    });

  } catch (error) {

    return res
      .status(401)
      .json({
        message:
          error.message,
      });

  }

};



export const logout =
  async (req, res) => {

    try {

      const sessionId =
        req.cookies?.session;

      if (sessionId) {

        await redis.del(
          `session:${sessionId}`
        );

      }

      res.clearCookie(
        "session",
        {
          httpOnly: true,
          secure: false,
          sameSite: "lax"
        }
      );

      return res.status(200).json({

        success: true,

        message: "Logged out successfully"

      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };


