import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Timer "mo:core/Timer";


import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Persistent upgrade logic with migration

actor {
  var schools = Map.empty<Text, { id : Text; name : Text; location : Text; country : ?Text; state : ?Text; city : ?Text; videoUrl : ?Text }>();
  var teachers = Map.empty<Text, { id : Text; name : Text; specialization : Text; schoolId : Text }>();
  var trainings = Map.empty<Text, { id : Text; hours : Nat; description : Text; schoolId : Text }>();
  var reviews = List.empty<{ reviewerName : Text; rating : Nat; comment : Text; schoolId : Text }>();
  var userProfiles = Map.empty<Principal, { name : Text }>();
  var blogPosts = Map.empty<Text, { id : Text; title : Text; content : Text; featuredImageUrl : ?Text; excerpt : ?Text }>();

  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

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

  // SYSTEM FUNCTIONS FOR UPGRADE-PERSISTENCE

  system func preupgrade() { };

  system func postupgrade() {
    // Always trigger automatic demo data seeding after empty install/upgrade
    let currentSchools = schools.size();
    if (currentSchools == 0) {
      let demoSchools : [School] = [
        {
          id = "demo-school-1";
          name = "Yoga Bliss Academy";
          location = "San Francisco, CA, USA";
          country = ?"USA";
          state = ?"CA";
          city = ?"San Francisco";
          videoUrl = null;
        },
        {
          id = "demo-school-2";
          name = "Mindful Movement Institute";
          location = "Austin, TX, USA";
          country = ?"USA";
          state = ?"TX";
          city = ?"Austin";
          videoUrl = null;
        },
        {
          id = "demo-school-3";
          name = "Sacred Flow Yoga";
          location = "Boulder, CO, USA";
          country = ?"USA";
          state = ?"CO";
          city = ?"Boulder";
          videoUrl = null;
        },
        {
          id = "demo-school-4";
          name = "Zen Yoga Center";
          location = "Portland, OR, USA";
          country = ?"USA";
          state = ?"OR";
          city = ?"Portland";
          videoUrl = null;
        },
        {
          id = "demo-school-5";
          name = "Inner Peace Yoga School";
          location = "Seattle, WA, USA";
          country = ?"USA";
          state = ?"WA";
          city = ?"Seattle";
          videoUrl = null;
        },
        {
          id = "demo-school-6";
          name = "Harmony Yoga Academy";
          location = "Denver, CO, USA";
          country = ?"USA";
          state = ?"CO";
          city = ?"Denver";
          videoUrl = null;
        },
      ];
      for (school in demoSchools.vals()) {
        schools.add(school.id, school);
      };
    };
  };

  // USER PROFILE METHODS

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
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

  // ADMIN CRUD METHODS - BLOG POSTS

  public shared ({ caller }) func createBlogPost(
    id : Text,
    title : Text,
    content : Text,
    featuredImageUrl : ?Text,
    excerpt : ?Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    if (blogPosts.containsKey(id)) {
      Runtime.trap("Blog post already exists");
    };
    let post : BlogPost = { id; title; content; featuredImageUrl; excerpt };
    blogPosts.add(id, post);
  };

  public shared ({ caller }) func updateBlogPost(
    id : Text,
    title : Text,
    content : Text,
    featuredImageUrl : ?Text,
    excerpt : ?Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Blog post does not exist");
    };
    let post : BlogPost = { id; title; content; featuredImageUrl; excerpt };
    blogPosts.add(id, post);
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    if (not blogPosts.containsKey(id)) {
      Runtime.trap("Blog post does not exist");
    };
    blogPosts.remove(id);
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
};
