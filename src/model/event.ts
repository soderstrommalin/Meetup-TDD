export interface Event {
  id: string;
  name: string;
  description: string;
  time: string;
  date: string;
  attendences: number;
  maxParticipants: number,
  totalRateValue: number,
  timesRated: number,
  image: string;
  comments: string[];
};

export interface EventProps {
  event: Event;
}