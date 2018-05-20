
contract Challenge {
   address owner;
   uint public admission = 100 finney; // Equal to 0.1 ether
   uint public totalPool;
   uint public participants;
   uint public maxParticipants = 5;
   address[] public players;

   struct Player {
      uint admissionPaid;
   }

   mapping(address => Player) playerInfo;

   function Challenge(uint _admission, uint _maxParticipants){
      owner = msg.sender;
      if(_admission != 0) admission = _admission;
      if(_maxParticipants != 0) maxParticipants = _maxParticipants;
   }

   // Fallback function in case someone sends ether to the contract so it doesn't get lost
   function() payable {}

   function kill(){
      if(msg.sender == owner)
      selfdestruct(owner);
   }

   function checkPlayerExists(address player) constant returns(bool){
      for(uint i = 0; i < players.length; i++){
         if(players[i] == player) return true;
      }
      return false;
   }

   function enter(uint number) payable{
      assert(checkPlayerExists(msg.sender) == false);
      assert(number >= 1 && number <= 10);
      assert(msg.value >= admission);
      assert(participants < maxParticipants);

      playerInfo[msg.sender].admissionPaid = msg.value;
      participants += 1;
      players.push(msg.sender);
      totalPool += msg.value;
   }

   function claim(uint number) {
      assert(checkPlayerExists(msg.sender) == true);
      msg.sender.transfer(totalPool);
      resetData()
   }

   function resetData(){
      players.length = 0; // Delete all the players array
      totalPool = 0;
      participants = 0;
   }
}