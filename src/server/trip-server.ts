import { api } from "./api";

export type TripDetails = {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
};

type TripCreate = Omit<TripDetails, "id" | "is_confirmed"> & {
  emails_to_invite: string[];
};

async function getById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`);
    return data.trip;
  } catch (error) {
    throw error;
  }
}

async function create({
  destination,
  starts_at,
  ends_at,
  emails_to_invite,
}: TripCreate) {
  try {
    const { data } = await api.post<{ tripId: string }>(`/trips`, {
      destination,
      starts_at,
      ends_at,
      emails_to_invite,
      owner_name: "Jhessica Frois",
      owner_email: "jhessfsantos@gmail.com",
    });
  } catch (error) {
    throw error;
  }
}

export const tripServer = {
  async create(data: any): Promise<{ tripId: string }> {
    const response = await api.post("/trip", data);
    return response.data;
  },

  async getById(id: string): Promise<TripDetails> {
    const response = await api.get(`/trip/${id}`);
    return response.data;
  },
};
