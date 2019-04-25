const express = require("express");
const router = express.Router();
const m = require("../../m");
const uuid = require("uuid");
//GET
router.get("/", (req, res) => res.json(m));

router.get("/:id", (req, res) => {
  const found = m.some(m => m.id === parseInt(req.params.id));
  if (found) {
    res.json(m.filter(m => m.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "member not found" });
  }
});

//CREATE
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "不完整" });
  }

  m.push(newMember);
  res.json(m);
  res.send(req.body);
});

//UPDATE
router.put("/:id", (req, res) => {
  const found = m.some(m => m.id === parseInt(req.params.id));
  if (found) {
    // const updM = req.body;
    // m.forEach(mm => {
    //   if (mm.id === parseInt(req.param.id)) {
    //     mm.name = updM.name ? updM.name : m.name;
    //     mm.email = updM.email ? updM.email : m.email;

    //     res.json({ msg: "updated" });
    //   }
    // });
    res.send("founded");
  } else {
    res.status(400).json({ msg: "member not found" });
  }
});

//DELETE
router.delete("/:id", (req, res) => {
  const found = m.some(m => m.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "deleted",
      m: m.filter(m => m.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: "member not found" });
  }
});

module.exports = router;
