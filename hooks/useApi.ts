import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fakeStoreApi = axios.create({
    baseURL: "https://fakestoreapi.com/"
})

export const useApi = <T>(url: string, key: unknown[]) => {
    const { isLoading, isError: error, data } = useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await fakeStoreApi.get<T>(url)
            return response.data
        }
    })

    return { error, isLoading, data }
}