export interface Recommendation {
  name: string;
  role: string;
  relationship: string;
  date: string;
  quote: string[];
}

// Newest first, as shown on LinkedIn. Quotes are verbatim paragraphs, minus the sign-off;
// roles are the recommender's LinkedIn headline, shortened.
export const recommendations: Recommendation[] = [
  {
    name: 'Mehrdad Bozorg',
    role: 'AI Engineer · Automaited GmbH',
    relationship: 'Mentor',
    date: 'March 2024',
    quote: [
      'I wholeheartedly recommend MD. Moinuddin, who served as a student assistant in our company. He possesses outstanding front-end development skills and a deep understanding of the latest frameworks in the field.',
      'MD. Moinuddin consistently delivered high-quality work, showcasing a proactive approach to problem-solving and excellent teamwork. His adaptability to new technologies and commitment to learning make him an asset to any team.',
      'I am confident that MD. Moinuddin will excel in future endeavors, bringing dedication and expertise to any project.',
    ],
  },
  {
    name: 'Md. Mehedi Hasan',
    role: 'Software Engineer',
    relationship: 'Worked on the same team',
    date: 'November 2022',
    quote: [
      "I had the immense pleasure of working with Mr. Moinuddin in quite a few projects. As a subordinate, he was an exceptional individual who excelled in anything he put his mind into. His humility and respectfulness deserves extra recognition. A super team player, who never shied away from a challenge. He is a versatile software engineer whom i'd hire again and again without a second thought.",
      'I wish him all the best in his future endeavors.',
    ],
  },
  {
    name: 'Shahin Mahmud',
    role: 'Engineering Manager · Ajentica',
    relationship: 'Managed me directly',
    date: 'September 2022',
    quote: [
      'Moinuddin is an excellent resource, and an expert of front-end programming has been a real asset to our clients and contacts. He makes sure all the deadlines meet and also the expected standards. He is a hardworking and dedicated person who will complete your project in a given time frame. I would recommend and endorse him.',
    ],
  },
  {
    name: 'Md. Ashraful Alam',
    role: 'Senior Backend Engineer · Monstarlab',
    relationship: 'Worked on the same team',
    date: 'September 2022',
    quote: [
      'I worked with Md Moinuddin on several projects at Genweb2 for about three years. A prominent, committed, and hardworking guy he is! Anyone can rely on him for an assigned task. Critical thinker with sharp technical knowledge. Wishing him all the very best for his next endeavour.',
    ],
  },
  {
    name: 'Raj Narayan Saha',
    role: 'Sr. Software Quality Assurance Engineer',
    relationship: 'Worked on the same team',
    date: 'August 2022',
    quote: ['Moinuddin is very energetic in work performance. His problem solving ability is really commendable. Best of Luck!'],
  },
  {
    name: 'Pranab Sarker',
    role: 'Full Stack Web Developer',
    relationship: 'Worked on the same team',
    date: 'August 2022',
    quote: [
      'I worked with Md Moinuddin in several projects at Genweb2 last three years. In our last project at Genweb2, I worked as his technical team lead and he did a great job with his frontend development skills and he focused on his task to be done as he never miss the deadline. While worked with him I found him very professional and he has the eagerness to learn new technologies and always ready to take new challenges. I recommend him because he can adapt to any company very easily.',
    ],
  },
  {
    name: 'Md. Nahian',
    role: 'Frontend Engineer & Architect',
    relationship: 'Studied together',
    date: 'July 2022',
    quote: [
      "It's been 8 years since we have known each other. We went to the same university and were in the same department. Throughout the years of our graduation I found him as an inspiring person. He is a man of his words and committed to his goals. His great leadership skills earned him the title of Captain of our inter departmental Football team.",
      'His ability to operate under pressure is something to cherish for. His thoughtfulness and creativity not only assured him progress in his study but also it impacted his growth positively as a human being.',
      'He is a good friend and most importantly a good human being.',
    ],
  },
];
