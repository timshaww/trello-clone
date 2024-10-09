import { Board, Member } from "./utils";


export const exampleMemberAlice: Member = {
    id: 'member-1',
    firstName: 'Alice',
    lastName: 'Smith',
    color: 'blue'
}

export const exampleMemberBob: Member = {
    id: 'member-2',
    firstName: 'Bob',
    lastName: 'Doe',
    color: 'red'
}

export const exampleMemberTim: Member = {
    id: 'member-3',
    firstName: 'Tim',
    lastName: 'Shaw',
    color: 'green'
}

export const exampleList1 = {
    id: 'list-1',
    title: 'To Do',
    cards: [
        {
            id: 'card-1',
            title: 'Design Homepage',
            description: 'Create the homepage for the project.',
            labels: [
                { title: 'Design', color: 'green' },
                { title: 'High Priority', color: 'red' }
            ],
            checklistItems: [
                {
                    id: 'check-1',
                    title: 'Create wireframes',
                    completed: false,
                    members: [exampleMemberAlice],
                    dueDate: '2024-10-10'
                },
                {
                    id: 'check-2',
                    title: 'Get approval from team',
                    completed: false,
                    members: [exampleMemberBob],
                    dueDate: '2024-10-12'
                }
            ],
            dueDate: '2024-10-15',
            members: [
                exampleMemberAlice
            ],
            watchers: [
                exampleMemberBob
            ],
            activities: [
                {
                    id: 'activity-1',
                    title: 'Alice commented',
                    member: exampleMemberAlice,
                    date: '2024-10-01',
                    reactions: [
                        {
                            id: 'reaction-1', emoji: '👍', member: exampleMemberBob
                        }
                    ]
                }
            ]
        }
    ]
}

export const exampleBoard: Board = {
    id: 'board-1',
    title: 'Project Board',
    star: true,
    background: 'alien',
    members: [
        exampleMemberAlice,
        exampleMemberBob
    ],
    lists: [
        {
            id: 'list-1',
            title: 'To Do',
            cards: [
                {
                    id: 'card-1',
                    title: 'Design Homepage',
                    description: 'Create the homepage for the project.',
                    labels: [
                        { title: 'Design', color: 'green' },
                        { title: 'High Priority', color: 'red' }
                    ],
                    checklistItems: [
                        {
                            id: 'check-1',
                            title: 'Create wireframes',
                            completed: false,
                            members: [{
                                id: 'member-1',
                                firstName: 'Alice',
                                lastName: 'Smith',
                                color: 'blue'
                            }],
                            dueDate: '2024-10-10'
                        },
                        {
                            id: 'check-2',
                            title: 'Get approval from team',
                            completed: false,
                            members: [{
                                id: 'member-2',
                                firstName: 'Bob',
                                lastName: 'Doe',
                                color: 'red'
                            }],
                            dueDate: '2024-10-12'
                        }
                    ],
                    dueDate: '2024-10-15',
                    members: [
                        {
                            id: 'member-1',
                            firstName: 'Alice',
                            lastName: 'Smith',
                            color: 'blue'
                        }
                    ],
                    watchers: [
                        {
                            id: 'member-2',
                            firstName: 'Bob',
                            lastName: 'Doe',
                            color: 'red'
                        }
                    ],
                    activities: [
                        {
                            id: 'activity-1',
                            title: 'Alice commented',
                            member: {
                                id: 'member-1',
                                firstName: 'Alice',
                                lastName: 'Smith',
                                color: 'blue'
                            },
                            date: '2024-10-01',
                            reactions: [
                                {
                                    id: 'reaction-1', emoji: '👍', member: {
                                        id: 'member-2',
                                        firstName: 'Bob',
                                        lastName: 'Doe',
                                        color: 'red'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'list-2',
            title: 'In Progress',
            cards: [
                {
                    id: 'card-2',
                    title: 'Develop Authentication',
                    description: 'Implement OAuth and session management for the app.',
                    labels: [
                        { title: 'Backend', color: 'blue' }
                    ],
                    checklistItems: [
                        {
                            id: 'check-3',
                            title: 'Set up OAuth with Google',
                            completed: true,
                            members: [{
                                id: 'member-2',
                                firstName: 'Bob',
                                lastName: 'Doe',
                                color: 'red'
                            }],
                            dueDate: '2024-10-05'
                        }
                    ],
                    dueDate: '2024-10-20',
                    members: [
                        {
                            id: 'member-2',
                            firstName: 'Bob',
                            lastName: 'Doe',
                            color: 'red'
                        }
                    ],
                    watchers: [
                        {
                            id: 'member-1',
                            firstName: 'Alice',
                            lastName: 'Smith',
                            color: 'blue'
                        }
                    ],
                    activities: [
                        {
                            id: 'activity-2',
                            title: 'Bob moved card to In Progress',
                            member: {
                                id: 'member-2',
                                firstName: 'Bob',
                                lastName: 'Doe',
                                color: 'red'
                            },
                            date: '2024-10-02',
                            reactions: []
                        }
                    ]
                }
            ]
        },
        {
            id: 'list-3',
            title: 'Done',
            cards: [
                {
                    id: 'card-3',
                    title: 'Set up Project Repo',
                    description: 'Initialize the project repository and push to GitHub.',
                    labels: [
                        { title: 'Setup', color: 'yellow' }
                    ],
                    checklistItems: [],
                    dueDate: '2024-09-30',
                    members: [
                        {
                            id: 'member-1',
                            firstName: 'Alice',
                            lastName: 'Smith',
                            color: 'blue'
                        },
                        {
                            id: 'member-2',
                            firstName: 'Bob',
                            lastName: 'Doe',
                            color: 'red'
                        }
                    ],
                    watchers: [],
                    activities: [
                        {
                            id: 'activity-3',
                            title: 'Alice marked card as Done',
                            member: {
                                id: 'member-1',
                                firstName: 'Alice',
                                lastName: 'Smith',
                                color: 'blue'
                            },
                            date: '2024-09-29',
                            reactions: [
                                {
                                    id: 'reaction-2', emoji: '🎉', member: {
                                        id: 'member-2',
                                        firstName: 'Bob',
                                        lastName: 'Doe',
                                        color: 'red'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

