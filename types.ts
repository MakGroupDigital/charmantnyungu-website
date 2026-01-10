
export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
