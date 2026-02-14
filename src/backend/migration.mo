import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

module {
  type SchoolId = Text;
  type TeacherId = Text;
  type TrainingId = Text;

  public type School = {
    id : SchoolId;
    name : Text;
    location : Text;
    videoUrl : ?Text;
  };

  public type Teacher = {
    id : TeacherId;
    name : Text;
    specialization : Text;
    schoolId : SchoolId;
  };

  public type Training = {
    id : TrainingId;
    hours : Nat;
    description : Text;
    schoolId : SchoolId;
  };

  public type Review = {
    reviewerName : Text;
    rating : Nat;
    comment : Text;
    schoolId : SchoolId;
  };

  // Old actor type (without automatic demo data)
  type OldActor = {
    schools : Map.Map<Text, School>;
    teachers : Map.Map<Text, Teacher>;
    trainings : Map.Map<Text, Training>;
    reviews : List.List<Review>;
  };

  // New actor type (demo data always present via persistent seed)
  type NewActor = {
    schools : Map.Map<Text, School>;
    teachers : Map.Map<Text, Teacher>;
    trainings : Map.Map<Text, Training>;
    reviews : List.List<Review>;
  };

  public func run(old : OldActor) : NewActor {
    // Always re-add demo data on upgrade to avoid "no schools" issues
    let demoSchools : [(SchoolId, School)] = [
      (
        "123",
        {
          id = "123";
          name = "Mo:core/Swim School";
          location = "New York";
          videoUrl = ?("https://youtube.com/v1");
        },
      ),
      (
        "124",
        {
          id = "124";
          name = "PH2O";
          location = "Los Angeles";
          videoUrl = ?("https://youtube.com/v2");
        },
      ),
      (
        "125",
        {
          id = "125";
          name = "Underwater College";
          location = "Ping";
          videoUrl = ?("https://youtube.com/v3");
        },
      ),
      (
        "126",
        {
          id = "126";
          name = "Universal Swim School";
          location = "Dublin";
          videoUrl = ?("https://youtube.com/v4");
        },
      ),
    ];

    let newSchools = old.schools.clone();

    for ((id, school) in demoSchools.values()) {
      if (not newSchools.containsKey(id)) {
        newSchools.add(id, school);
      };
    };

    { old with schools = newSchools };
  };
};
