export interface Risk {
  id: number;
  name: string;
  category: string;
  level: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Closed';
}
