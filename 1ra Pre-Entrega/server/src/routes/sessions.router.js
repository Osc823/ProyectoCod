import { Router } from "express";
import passport from "passport";
import { githubcallback } from "../controllers/passportGithub.Controller.js";
import {
  loginPassportLocal,
  registerPassportLocal,
} from "../controllers/passportLocal.Controller.js";

const router = Router();

/*=============================================
=                   Passport Github           =
=============================================*/
router.get("/github",passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {{ }}
);

router.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/github/error" }),
  githubcallback
);

/*=============================================
=                   Passport Local            =
=============================================*/

// Register
router.post("/register", passport.authenticate("register", {failureRedirect: "api/session/fail-register",}),
  registerPassportLocal
);

// Login
router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/fail-login" }),loginPassportLocal);


router.get("/fail-register", (req, res) => {
  res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
  res.status(401).send({ error: "Failed to process login!" });
});

export default router;
 