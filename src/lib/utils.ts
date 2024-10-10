import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type Board = {
    id: string
    title: string
    lists: List[]
    members: Member[]
    star: boolean
    background: 'snow' | 'ocean' | 'crystal' | 'rainbow' | 'peach' | 'flower' | 'earth' | 'alien'
}

export type List = {
    id: string
    title: string
    cards: Card[]
}

export type Card = {
    id: string
    title: string
    description: string
    labels: Label[]
    checklist: Checklist | null
    dueDate: Date
    members: Member[]
    watchers: Member[]
    activities: Activity[]
}

export type Checklist = {
    id: string
    title: string
    checklistItems: ChecklistItem[]
}

export type Member = {
    id: string
    firstName: string
    lastName: string
    color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black'
}

export type Label = {
    id: string
    title?: string
    color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black'
}

export type ChecklistItem = {
    id: string
    title: string
    completed: boolean
    members: Member[]
    dueDate: Date
}

export type Activity = {
    id: string
    title: string
    member: Member
    date: Date
    reactions: Reaction[]
}

export type Reaction = {
    id: string
    emoji: string
    member: Member
}