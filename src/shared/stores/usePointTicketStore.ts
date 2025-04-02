import { create } from 'zustand';

interface PointTicketStoreType {
  point: number;
  setPoint: (point: number) => void;
  ticket: number;
  setTicket: (ticket: number) => void;
}

const usePointTicketStore = create<PointTicketStoreType>((set) => ({
  point: 0,
  setPoint: (point) => set((state) => ({ ...state, point })),
  ticket: 0,
  setTicket: (ticket) => set((state) => ({ ...state, ticket })),
}));

export default usePointTicketStore;
