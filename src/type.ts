export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer: string
}

export class EmptyEventItem implements EventItem {
  id: number = 0
  category: string = ''
  title: string = ''
  description: string = ''
  location: string = ''
  date: string = ''
  time: string = ''
  organizer: string = ''
}
