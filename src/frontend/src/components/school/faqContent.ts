export interface FAQItem {
  question: string;
  answer: string;
}

export const defaultSchoolFAQs: FAQItem[] = [
  {
    question: "What should I bring to my first class?",
    answer: "Bring a yoga mat (or rent one at the studio), comfortable clothing that allows movement, a water bottle, and an open mind. We recommend arriving 10-15 minutes early to get settled and meet your instructor."
  },
  {
    question: "Do I need prior yoga experience to join a teacher training program?",
    answer: "While some programs welcome complete beginners, most 200-hour teacher training programs recommend at least 6-12 months of consistent yoga practice. Check with the specific school for their prerequisites and experience requirements."
  },
  {
    question: "How long does it take to complete a yoga teacher training?",
    answer: "A 200-hour training typically takes 3-6 months if done part-time on weekends, or 3-4 weeks for intensive full-time programs. 300-hour and 500-hour trainings vary by school but generally require several months to a year of study."
  },
  {
    question: "Will I be certified to teach after completing the training?",
    answer: "Upon successful completion of a Yoga Alliance registered program, you'll receive a certificate and be eligible to register as a RYT (Registered Yoga Teacher) with Yoga Alliance, which is recognized internationally."
  },
  {
    question: "What is the difference between 200-hour, 300-hour, and 500-hour trainings?",
    answer: "A 200-hour training is the foundational certification covering yoga philosophy, anatomy, teaching methodology, and practice. A 300-hour training is advanced study for those who've completed their 200-hour. A 500-hour designation means you've completed both levels (200 + 300 hours)."
  },
  {
    question: "Are payment plans available for teacher training programs?",
    answer: "Many schools offer flexible payment plans to make training more accessible. Contact the school directly to discuss payment options, early bird discounts, and any available scholarships or financial assistance."
  }
];
