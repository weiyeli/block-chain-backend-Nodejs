pragma solidity ^0.5.0;

contract Ehealth {
    address payable public patient;
    //address payable public hospital;
    
    string name;
    string record;
    string gender;
    address myaddress;
    address checker;
    uint age;
    
    
    constructor(string memory _name, string memory _gender, uint _age) public {
        name = _name;
        gender = _gender;
        age = _age;
        myaddress  = msg.sender;
        checker = msg.sender;
    }
    
    modifier check() {
        require(
            msg.sender == myaddress || msg.sender == checker,
            "Only ath-person can do this ops."
            );
        _;
    }
    
    modifier check_doc() {
        require(
            msg.sender == checker,
            "Only doc can do this ops."
            );
        _;
    }
    
    event makeChange(address _a);
    
    function authens(address _checker) public{
        checker = _checker;
    }
    
    function unAuth() public check{
        checker = myaddress;
    }
    
    function getName() public view returns(string memory){
        return name;
    }

    function getRec() public view check returns(string memory,string memory,uint,string memory){
        return (name, gender, age,record);
    }
    
    function setRec(string memory _rec) public check{
        record = _rec;
        emit makeChange(msg.sender);// who changed it.
    }
    
    
}

