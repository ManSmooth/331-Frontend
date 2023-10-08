export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer?: Queryable & Partial<OrganizerItem>
  participants?: ParticipantItem
  images?: string[]
}

export interface Queryable {
  id: number
}

export interface OrganizerItem extends Queryable {
  id: number
  name: string
  ownEvents?: EventItem[]
  image?: string
}

export interface ParticipantItem   {
  id: number
  name: string
  telNo: string
  eventHistory?: EventItem[]
}

