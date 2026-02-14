import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Migration "migration";
import Iter "mo:core/Iter";

// Rehydrate demo data on EVERY upgrade & install via actor with-clause
(with migration = Migration.run)
actor {
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

  let schools = Map.empty<SchoolId, School>();
  let teachers = Map.empty<TeacherId, Teacher>();
  let trainings = Map.empty<TrainingId, Training>();
  let reviews = List.empty<Review>();

  public shared ({ caller }) func addSchool(id : SchoolId, name : Text, location : Text, videoUrl : ?Text) : async () {
    if (schools.containsKey(id)) { Runtime.trap("School already exists") };
    let school : School = { id; name; location; videoUrl };
    schools.add(id, school);
  };

  public shared ({ caller }) func addTeacher(id : TeacherId, name : Text, specialization : Text, schoolId : SchoolId) : async () {
    if (teachers.containsKey(id)) { Runtime.trap("Teacher already exists") };
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    let teacher : Teacher = { id; name; specialization; schoolId };
    teachers.add(id, teacher);
  };

  public shared ({ caller }) func addTraining(id : TrainingId, hours : Nat, description : Text, schoolId : SchoolId) : async () {
    if (trainings.containsKey(id)) { Runtime.trap("Training already exists") };
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    let training : Training = { id; hours; description; schoolId };
    trainings.add(id, training);
  };

  public shared ({ caller }) func addReview(schoolId : SchoolId, reviewerName : Text, rating : Nat, comment : Text) : async () {
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    if (rating > 5) { Runtime.trap("Rating must be 0-5") };
    let review : Review = { reviewerName; rating; comment; schoolId };
    reviews.add(review);
  };

  public query ({ caller }) func getSchool(id : SchoolId) : async School {
    switch (schools.get(id)) {
      case (null) { Runtime.trap("School not found") };
      case (?school) { school };
    };
  };

  public query ({ caller }) func getTeacher(id : TeacherId) : async Teacher {
    switch (teachers.get(id)) {
      case (null) { Runtime.trap("Teacher not found") };
      case (?teacher) { teacher };
    };
  };

  public query ({ caller }) func getTraining(id : TrainingId) : async Training {
    switch (trainings.get(id)) {
      case (null) { Runtime.trap("Training not found") };
      case (?training) { training };
    };
  };

  public query ({ caller }) func getTeachersBySchool(schoolId : SchoolId) : async [Teacher] {
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    teachers.values().toArray().filter(
      func(teacher) { teacher.schoolId == schoolId }
    );
  };

  public query ({ caller }) func getTrainingsBySchool(schoolId : SchoolId) : async [Training] {
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    trainings.values().toArray().filter(
      func(training) { training.schoolId == schoolId }
    );
  };

  public query ({ caller }) func getReviewsForSchool(schoolId : SchoolId) : async [Review] {
    reviews.toArray().filter(func(review) { review.schoolId == schoolId });
  };

  public query ({ caller }) func searchSchoolsByName(nameQuery : Text) : async [School] {
    let filteredSchools = schools.values().toArray().filter(
      func(school) { nameQuery == "" or school.name.contains(#text nameQuery) }
    );
    filteredSchools;
  };

  public shared ({ caller }) func seedSchools() : async () {
    // Only seed new entries, skip existing ones
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

    for ((id, school) in demoSchools.values()) {
      if (not schools.containsKey(id)) {
        schools.add(id, school);
      };
    };
  };
};
