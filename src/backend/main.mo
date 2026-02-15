import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";


import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = { name : Text };

  type SchoolId = Text;
  type TeacherId = Text;
  type TrainingId = Text;

  public type School = {
    id : SchoolId;
    name : Text;
    location : Text;
    country : ?Text;
    state : ?Text;
    city : ?Text;
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

  public type BlogPost = {
    id : Text;
    title : Text;
    content : Text;
    featuredImageUrl : ?Text;
    excerpt : ?Text;
  };

  let schools = Map.empty<SchoolId, School>();
  let teachers = Map.empty<TeacherId, Teacher>();
  let trainings = Map.empty<TrainingId, Training>();
  let reviews = List.empty<Review>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let blogPosts = Map.empty<Text, BlogPost>();

  // USER PROFILE METHODS
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return null;
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      return null;
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ADMIN CRUD METHODS - SCHOOLS

  public shared ({ caller }) func createSchool(
    id : SchoolId,
    name : Text,
    location : Text,
    country : ?Text,
    state : ?Text,
    city : ?Text,
    videoUrl : ?Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create schools");
    };
    if (schools.containsKey(id)) {
      Runtime.trap("School already exists");
    };
    let school : School = { id; name; location; country; state; city; videoUrl };
    schools.add(id, school);
  };

  public shared ({ caller }) func updateSchool(
    id : SchoolId,
    name : Text,
    location : Text,
    country : ?Text,
    state : ?Text,
    city : ?Text,
    videoUrl : ?Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update schools");
    };
    if (not schools.containsKey(id)) {
      Runtime.trap("School does not exist");
    };
    let school : School = { id; name; location; country; state; city; videoUrl };
    schools.add(id, school);
  };

  public shared ({ caller }) func deleteSchool(id : SchoolId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete schools");
    };
    switch (schools.get(id)) {
      case (null) { Runtime.trap("School does not exist") };
      case (?_) {
        schools.remove(id);
        let filteredTeachers = teachers.filter(
          func(_, teacher) { teacher.schoolId != id }
        );
        teachers.clear();
        filteredTeachers.entries().forEach(func((k, v)) { teachers.add(k, v) });

        let filteredTrainings = trainings.filter(
          func(_, training) { training.schoolId != id }
        );
        trainings.clear();
        filteredTrainings.entries().forEach(func((k, v)) { trainings.add(k, v) });

        let filteredReviews = reviews.filter(
          func(review) { review.schoolId != id }
        );
        reviews.clear();
        filteredReviews.forEach(func(review) { reviews.add(review) });
      };
    };
  };

  // ADMIN CRUD METHODS - TEACHERS
  public shared ({ caller }) func addTeacher(
    id : TeacherId,
    name : Text,
    specialization : Text,
    schoolId : SchoolId,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add teachers");
    };
    if (teachers.containsKey(id)) { Runtime.trap("Teacher already exists") };
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    let teacher : Teacher = { id; name; specialization; schoolId };
    teachers.add(id, teacher);
  };

  public shared ({ caller }) func updateTeacher(
    id : TeacherId,
    name : Text,
    specialization : Text,
    schoolId : SchoolId,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update teachers");
    };
    if (not teachers.containsKey(id)) { Runtime.trap("Teacher does not exist") };
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    let teacher : Teacher = { id; name; specialization; schoolId };
    teachers.add(id, teacher);
  };

  public shared ({ caller }) func deleteTeacher(id : TeacherId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete teachers");
    };
    if (not teachers.containsKey(id)) { Runtime.trap("Teacher does not exist") };
    teachers.remove(id);
  };

  // ADMIN CRUD METHODS - TRAININGS
  public shared ({ caller }) func addTraining(
    id : TrainingId,
    hours : Nat,
    description : Text,
    schoolId : SchoolId,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add trainings");
    };
    if (trainings.containsKey(id)) { Runtime.trap("Training already exists") };
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    let training : Training = { id; hours; description; schoolId };
    trainings.add(id, training);
  };

  public shared ({ caller }) func updateTraining(
    id : TrainingId,
    hours : Nat,
    description : Text,
    schoolId : SchoolId,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update trainings");
    };
    if (not trainings.containsKey(id)) { Runtime.trap("Training does not exist") };
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    let training : Training = { id; hours; description; schoolId };
    trainings.add(id, training);
  };

  public shared ({ caller }) func deleteTraining(id : TrainingId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete trainings");
    };
    if (not trainings.containsKey(id)) { Runtime.trap("Training does not exist") };
    trainings.remove(id);
  };

  // ------------ QUERY METHODS (PUBLIC ACCESS) -----------------

  public query ({ caller }) func getSchool(id : SchoolId) : async ?School {
    schools.get(id);
  };

  public query ({ caller }) func getTeacher(id : TeacherId) : async ?Teacher {
    teachers.get(id);
  };

  public query ({ caller }) func getTraining(id : TrainingId) : async ?Training {
    trainings.get(id);
  };

  public query ({ caller }) func getTeachersBySchool(schoolId : SchoolId) : async [Teacher] {
    if (not schools.containsKey(schoolId)) { return [] };
    teachers.values().toArray().filter(
      func(teacher) { teacher.schoolId == schoolId }
    );
  };

  public query ({ caller }) func getTrainingsBySchool(schoolId : SchoolId) : async [Training] {
    if (not schools.containsKey(schoolId)) { return [] };
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

  // New method to search schools by structured location
  public query ({ caller }) func getSchoolsByLocation(
    country : ?Text,
    state : ?Text,
    city : ?Text,
  ) : async [School] {
    schools.values().toArray().filter(
      func(school) {
        if (country != null and state != null and city != null) {
          switch (country, state, city) {
            case (?c, ?s, ?ci) {
              return school.country == ?c and school.state == ?s and school.city == ?ci;
            };
            case (_) { return false };
          };
        } else if (country != null and state != null) {
          switch (country, state) {
            case (?c, ?s) { return school.country == ?c and school.state == ?s };
            case (_) { return false };
          };
        } else if (country != null and city != null) {
          switch (country, city) {
            case (?c, ?ci) { return school.country == ?c and school.city == ?ci };
            case (_) { return false };
          };
        } else if (state != null and city != null) {
          switch (state, city) {
            case (?s, ?ci) { return school.state == ?s and school.city == ?ci };
            case (_) { return false };
          };
        } else if (country != null) {
          switch (country) {
            case (?c) { return school.country == ?c };
            case (_) { return false };
          };
        } else if (state != null) {
          switch (state) {
            case (?s) { return school.state == ?s };
            case (_) { return false };
          };
        } else if (city != null) {
          switch (city) {
            case (?ci) { return school.city == ?ci };
            case (_) { return false };
          };
        };
        return true;
      }
    );
  };

  // -------------- REVIEW MANAGEMENT (USER-LEVEL AUTH) ---------------

  public shared ({ caller }) func addReview(
    schoolId : SchoolId,
    reviewerName : Text,
    rating : Nat,
    comment : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };
    if (not schools.containsKey(schoolId)) { Runtime.trap("School does not exist") };
    if (rating > 5) { Runtime.trap("Rating must be 0-5") };
    let review : Review = { reviewerName; rating; comment; schoolId };
    reviews.add(review);
  };

  // -------------- BLOG POSTS (PUBLIC ACCESS) ---------------

  public query ({ caller }) func getBlogPost(id : Text) : async ?BlogPost {
    blogPosts.get(id);
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  // SYSTEM HOOKS
  system func preupgrade() { };

  system func postupgrade() { };
};
