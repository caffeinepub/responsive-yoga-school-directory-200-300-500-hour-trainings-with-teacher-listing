import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Training {
    id: TrainingId;
    hours: bigint;
    description: string;
    schoolId: SchoolId;
}
export type SchoolId = string;
export interface School {
    id: SchoolId;
    name: string;
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
export type TeacherId = string;
export interface Review {
    reviewerName: string;
    comment: string;
    schoolId: SchoolId;
    rating: bigint;
}
export interface backendInterface {
    addReview(schoolId: SchoolId, reviewerName: string, rating: bigint, comment: string): Promise<void>;
    addSchool(id: SchoolId, name: string, location: string, videoUrl: string | null): Promise<void>;
    addTeacher(id: TeacherId, name: string, specialization: string, schoolId: SchoolId): Promise<void>;
    addTraining(id: TrainingId, hours: bigint, description: string, schoolId: SchoolId): Promise<void>;
    getReviewsForSchool(schoolId: SchoolId): Promise<Array<Review>>;
    getSchool(id: SchoolId): Promise<School>;
    getTeacher(id: TeacherId): Promise<Teacher>;
    getTeachersBySchool(schoolId: SchoolId): Promise<Array<Teacher>>;
    getTraining(id: TrainingId): Promise<Training>;
    getTrainingsBySchool(schoolId: SchoolId): Promise<Array<Training>>;
    searchSchoolsByName(nameQuery: string): Promise<Array<School>>;
    seedSchools(): Promise<void>;
}
