import { Timestamp } from 'firebase/firestore';

export const formatLastSeen = (date: Date | string | Timestamp | null | undefined): string => {
  if (!date) return '';

  let dateObj: Date;
  
  if (date instanceof Timestamp) {
    dateObj = date.toDate();
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatLastSeen:', date);
    return '';
  }

  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};

export const formatMessageTime = (date: Date | string | Timestamp | null | undefined): string => {
  if (!date) return '';

  let dateObj: Date;
  
  if (date instanceof Timestamp) {
    dateObj = date.toDate();
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatMessageTime:', date);
    return '';
  }

  return dateObj.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}; 