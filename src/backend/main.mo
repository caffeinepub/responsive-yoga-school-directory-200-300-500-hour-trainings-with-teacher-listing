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

  var schools = Map.empty<SchoolId, School>();
  var teachers = Map.empty<TeacherId, Teacher>();
  var trainings = Map.empty<TrainingId, Training>();
  var reviews = List.empty<Review>();
  var userProfiles = Map.empty<Principal, UserProfile>();
  var blogPosts = Map.empty<Text, BlogPost>();

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

  system func preupgrade() { };

  system func postupgrade() {
    let seededReviews = List.fromArray<Review>([
      {
        reviewerName = "Jessica Smith";
        rating = 5;
        comment = "Life-changing experience at Vinyasa Yogashala! The teachers are incredibly knowledgeable and supportive. Highly recommend the 200-hour teacher training.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Rahul Gupta";
        rating = 4;
        comment = "Great location and facilities. The 300-hour course was challenging but very rewarding. Only wish there were more advanced workshops.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Emily Chen";
        rating = 5;
        comment = "Absolutely loved my time here. The teachers are passionate and approachable, and the curriculum is comprehensive.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Carlos Mendez";
        rating = 5;
        comment = "Perfect blend of traditional and modern yoga. The meditation sessions were especially transformative.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Priya Sharma";
        rating = 4;
        comment = "Wonderful community of practitioners. I appreciated the focus on personal growth and mindfulness.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Marta Rodriguez";
        rating = 3;
        comment = "Great teachers and content, but I found the accommodations to be a bit modest for the price.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Liam O&acute;Connor";
        rating = 5;
        comment = "Incredible energy, beautiful setting. The advanced asana workshops were intense but very rewarding.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Anna Müller";
        rating = 5;
        comment = "Holistic approach to yoga. The philosophy classes were eye-opening and thought-provoking.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Vikram Patel";
        rating = 4;
        comment = "Balanced curriculum with focus on both practice and theory. The Pranayama sessions were excellent.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Sara Williams";
        rating = 4;
        comment = "Supportive teachers and a welcoming atmosphere. I gained so much confidence in my teaching abilities.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Akash Singh";
        rating = 5;
        comment = "Traditional Hatha yoga with modern insights. The Ayurveda workshops were both informative and practical.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Olivia Johnson";
        rating = 4;
        comment = "Great value for the quality of teaching. I wish there were more options for advanced classes.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Mei Li";
        rating = 5;
        comment = "Experienced and passionate instructors. The Yoga Nidra sessions were deeply relaxing and restorative.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Arjun Kumar";
        rating = 5;
        comment = "Comprehensive training program that covers all aspects of yoga. The food and atmosphere were excellent.";
        schoolId = "vinyasa-yogashala";
      },
      {
        reviewerName = "Samantha Lee";
        rating = 4;
        comment = "Transformative experience that improved my physical and mental well-being. I learned so much from the instructors.";
        schoolId = "vinyasa-yogashala";
      },
    ]);

    // Filter out existing reviews for "vinyasa-yogashala" and add new ones
    let filteredOldReviews = reviews.filter(func(existingReview) { existingReview.schoolId != "vinyasa-yogashala" });
    filteredOldReviews.addAll(seededReviews.values());
    reviews.clear();
    reviews.addAll(filteredOldReviews.values());
  };
};
