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
                        { title: 'Design', color: 'green', id: 'label-1' },
                        { title: 'High Priority', color: 'red', id: 'label-2' }
                    ],
                    checklist: {
                        id: 'checklist-1',
                        title: 'Design Tasks',
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
                                dueDate: new Date('2024-10-10')
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
                                dueDate: new Date('2024-10-12')
                            }
                        ],
                    },
                    dueDate: new Date('2024-10-15'),
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
                            date: new Date('2024-10-01'),
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
                        { title: 'Backend', color: 'blue', id: 'label-4' }
                    ],
                    checklist: {
                        id: 'checklist-2',
                        title: 'Development Tasks',
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
                                dueDate: new Date('2024-10-05')
                            }
                        ],
                    },
                    dueDate: new Date('2024-10-20'),
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
                            date: new Date('2024-10-02'),
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
                        { title: 'Setup', color: 'yellow', id: 'label-3' }
                    ],
                    checklist: null,
                    dueDate: new Date('2024-09-30'),
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
                    watchers: [exampleMemberTim],
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
                            date: new Date('2024-09-29'),
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

/*
export type Board = {
    id: UniqueIdentifier
    title: string
    listsIds: UniqueIdentifier[]
    membersIds: UniqueIdentifier[]
    star: boolean
    background: 'snow' | 'ocean' | 'crystal' | 'rainbow' | 'peach' | 'flower' | 'earth' | 'alien'
}

export type List = {
    id: UniqueIdentifier
    title: string
    cardsIds: UniqueIdentifier[]
}

export type Card = {
    id: UniqueIdentifier
    listId: UniqueIdentifier
    title: string
    description: string
    labelsIds: UniqueIdentifier[]
    checklist: Checklist | null
    dueDate: Date
    membersIds: UniqueIdentifier[]
    watchersIds: UniqueIdentifier[]
    activitiesIds: UniqueIdentifier[]
}

export type Checklist = {
    id: UniqueIdentifier
    title: string
    checklistItemsIds: UniqueIdentifier[]
}

export type Member = {
    id: UniqueIdentifier
    firstName: string
    lastName: string
    color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black'
}

export type Label = {
    id: UniqueIdentifier
    title?: string
    color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black'
}

export type ChecklistItem = {
    id: UniqueIdentifier
    title: string
    completed: boolean
    membersIds: UniqueIdentifier[]
    dueDate: Date
}

export type Activity = {
    id: UniqueIdentifier
    title: string
    member: Member
    date: Date
    reactionsIds: UniqueIdentifier[]
}

export type Reaction = {
    id: UniqueIdentifier
    emoji: string
    member: Member
}
    */