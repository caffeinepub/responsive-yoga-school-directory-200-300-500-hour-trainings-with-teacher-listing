import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type OldActor = {
    schools : Map.Map<Text, { id : Text; name : Text; location : Text; country : ?Text; state : ?Text; city : ?Text; videoUrl : ?Text }>;
    teachers : Map.Map<Text, { id : Text; name : Text; specialization : Text; schoolId : Text }>;
    trainings : Map.Map<Text, { id : Text; hours : Nat; description : Text; schoolId : Text }>;
    reviews : List.List<{ reviewerName : Text; rating : Nat; comment : Text; schoolId : Text }>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    blogPosts : Map.Map<Text, { id : Text; title : Text; content : Text; featuredImageUrl : ?Text; excerpt : ?Text }>;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    old;
  };
};
