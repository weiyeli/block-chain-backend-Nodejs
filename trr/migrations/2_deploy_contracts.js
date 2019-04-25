const PatientRec = artifacts.require("../contracts/PatientRec.sol");

module.exports = function(deployer) {
  deployer.deploy(PatientRec);
};
