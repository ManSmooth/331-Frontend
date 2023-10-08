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
}

export interface Queryable {
  id: number
}

export interface OrganizerItem extends Queryable {
  id: number
  name: string
  ownEvents?: EventItem[]
}

export interface ParticipantItem   {
  id: number
  name: string
  telNo: string
  eventHistory?: EventItem[]
}

