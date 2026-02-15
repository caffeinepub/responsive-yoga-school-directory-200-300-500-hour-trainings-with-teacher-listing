import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type SchoolId = Text;
  type TeacherId = Text;
  type TrainingId = Text;

  type OldSchool = {
    id : SchoolId;
    name : Text;
    location : Text;
    videoUrl : ?Text;
  };

  type OldTeacher = {
    id : TeacherId;
    name : Text;
    specialization : Text;
    schoolId : SchoolId;
  };

  type OldTraining = {
    id : TrainingId;
    hours : Nat;
    description : Text;
    schoolId : SchoolId;
  };

  type OldReview = {
    reviewerName : Text;
    rating : Nat;
    comment : Text;
    schoolId : SchoolId;
  };

  type OldBlogPost = {
    id : Text;
    title : Text;
    content : Text;
    featuredImageUrl : ?Text;
    excerpt : ?Text;
  };

  type OldActor = {
    schools : Map.Map<SchoolId, OldSchool>;
    teachers : Map.Map<TeacherId, OldTeacher>;
    trainings : Map.Map<TrainingId, OldTraining>;
    reviews : List.List<OldReview>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    blogPosts : Map.Map<Text, OldBlogPost>;
  };

  type NewSchool = {
    id : SchoolId;
    name : Text;
    location : Text;
    country : ?Text;
    state : ?Text;
    city : ?Text;
    videoUrl : ?Text;
  };

  type NewTeacher = {
    id : TeacherId;
    name : Text;
    specialization : Text;
    schoolId : SchoolId;
  };

  type NewTraining = {
    id : TrainingId;
    hours : Nat;
    description : Text;
    schoolId : SchoolId;
  };

  type NewReview = {
    reviewerName : Text;
    rating : Nat;
    comment : Text;
    schoolId : SchoolId;
  };

  type NewBlogPost = {
    id : Text;
    title : Text;
    content : Text;
    featuredImageUrl : ?Text;
    excerpt : ?Text;
  };

  type NewActor = {
    schools : Map.Map<SchoolId, NewSchool>;
    teachers : Map.Map<TeacherId, NewTeacher>;
    trainings : Map.Map<TrainingId, NewTraining>;
    reviews : List.List<NewReview>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    blogPosts : Map.Map<Text, NewBlogPost>;
  };

  public func run(old : OldActor) : NewActor {
    let newSchools = old.schools.map<SchoolId, OldSchool, NewSchool>(
      func(_id, oldSchool) {
        {
          oldSchool with
          country = null;
          state = null;
          city = null;
        };
      }
    );
    { old with schools = newSchools };
  };
};
