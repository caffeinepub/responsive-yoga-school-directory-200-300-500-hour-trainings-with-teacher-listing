import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Review {
    reviewerName: string;
    comment: string;
    schoolId: SchoolId;
    rating: bigint;
}
export interface Training {
    id: TrainingId;
    hours: bigint;
    description: string;
    schoolId: SchoolId;
}
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    featuredImageUrl?: string;
    excerpt?: string;
}
export type SchoolId = string;
export interface School {
    id: SchoolId;
    country?: string;
    city?: string;
    name: string;
    state?: string;
    videoUrl?: string;
    location: string;
}
export type TrainingId = string;
export interface Teacher {
    id: TeacherId;
    name: string;
    schoolId: SchoolId;
    specialization: string;
}
export interface UserProfile {
    name: string;
}
export type TeacherId = string;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(schoolId: SchoolId, reviewerName: string, rating: bigint, comment: string): Promise<void>;
    addTeacher(id: TeacherId, name: string, specialization: string, schoolId: SchoolId): Promise<void>;
    addTraining(id: TrainingId, hours: bigint, description: string, schoolId: SchoolId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createSchool(id: SchoolId, name: string, location: string, country: string | null, state: string | null, city: string | null, videoUrl: string | null): Promise<void>;
    deleteSchool(id: SchoolId): Promise<void>;
    deleteTeacher(id: TeacherId): Promise<void>;
    deleteTraining(id: TrainingId): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getBlogPost(id: string): Promise<BlogPost | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getReviewsForSchool(schoolId: SchoolId): Promise<Array<Review>>;
    getSchool(id: SchoolId): Promise<School | null>;
    getSchoolsByLocation(country: string | null, state: string | null, city: string | null): Promise<Array<School>>;
    getTeacher(id: TeacherId): Promise<Teacher | null>;
    getTeachersBySchool(schoolId: SchoolId): Promise<Array<Teacher>>;
    getTraining(id: TrainingId): Promise<Training | null>;
    getTrainingsBySchool(schoolId: SchoolId): Promise<Array<Training>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchSchoolsByName(nameQuery: string): Promise<Array<School>>;
    updateSchool(id: SchoolId, name: string, location: string, country: string | null, state: string | null, city: string | null, videoUrl: string | null): Promise<void>;
    updateTeacher(id: TeacherId, name: string, specialization: string, schoolId: SchoolId): Promise<void>;
    updateTraining(id: TrainingId, hours: bigint, description: string, schoolId: SchoolId): Promise<void>;
}
