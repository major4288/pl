import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/property";

const SHEET_URL = "https://opensheet.elk.sh/1f2_L9h5agZcNjOLfW7E9tae7ZQoV3399mDsWVuDCvRg/sheet1";

export const useProperties = () => {
  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await fetch(SHEET_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      return response.json();
    },
  });
};
