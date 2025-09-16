const user = {
  token: 'test-token',
  user: {
    id: 1,
    email: 'test@email.com',
    cohortId: 1,
    role: 'STUDENT',
    firstName: 'Joe',
    lastName: 'Bloggs',
    bio: 'Lorem ipsum dolor sit amet.',
    githubUrl: 'https://github.com/vherus'
  }
};

const cohort = {
  id: 1,
  name: 'Software Development, Cohort 1',
  users: [
    {
      id: 1,
      firstName: 'Joe',
      lastName: 'Bloggs',
      cohortId: 1
    },
    {
      id: 2,
      firstName: 'Anna',
      lastName: 'Andersen',
      cohortId: 1
    },
    {
      id: 3,
      firstName: 'Jonas',
      lastName: 'Johansen',
      cohortId: 1
    }
  ]
};

const posts = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: '19 February at 10:32',
    updatedAt: '19 February at 10:32',
    author: {
      id: 1,
      cohortId: 1,
      role: 'STUDENT',
      firstName: 'Sam',
      lastName: 'Fletcher',
      bio: 'Lorem ipsum dolor sit amet.',
      githubUrl: 'https://github.com/vherus'
    }
  },
  {
    id: 2,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    createdAt: '19 February at 09:56',
    updatedAt: '19 February at 10:32',
    author: {
      id: 2,
      cohortId: 1,
      role: 'STUDENT',
      firstName: 'Dolor',
      lastName: 'Lobortis',
      bio: 'Lorem ipsum dolor sit amet.',
      githubUrl: 'https://github.com/vherus'
    },
    comments: [
      {
        id: 2,
        name: 'Dana Sharwarma',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 3,
        name: 'James Doakes',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ]
  }
];

export { user, cohort, posts };
